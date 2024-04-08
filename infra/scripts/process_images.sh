#!/bin/bash

# Define a função para instalar dependências necessárias
install_dependencies() {
    echo "Instalando dependências necessárias..."
    if [ "${OS}" = "Linux" ]; then
        sudo apt-get update && sudo apt-get install -y jq wget imagemagick
    elif [ "${OS}" = "macOS" ]; then
        brew install jq wget imagemagick coreutils
    fi
}

# Define a função para gerar nomes de arquivo aleatórios com 5 caracteres
generate_random_name() {
    if [ "${OS}" = "Linux" ]; then
        echo $(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 5 | head -n 1)
    elif [ "${OS}" = "macOS" ]; then
        # Usa gshuf (do pacote coreutils) para gerar um nome de 5 caracteres alfanuméricos
        echo $(gshuf -i1-1000000 -n1 | md5 | head -c 5)
    fi
}

# Define a função para processar e salvar cada imagem
process_image() {
    local url="$1"
    local destination_dir="$2"
    local image_size="$3"
    local thumbnail_size="$4"
    local quality="$5"
    local random_name="$(generate_random_name)"
    local filename="${random_name}.webp"

    # Baixa a imagem
    wget -q "${url}" -O "/tmp/${filename}"

    # Processa a imagem principal
    convert "/tmp/${filename}" -resize "${image_size}x${image_size}^" -gravity center -extent "${image_size}x${image_size}" -quality "${quality}" "${destination_dir}/images/${filename}"

    # Processa a miniatura
    convert "/tmp/${filename}" -resize "${thumbnail_size}x${thumbnail_size}" "${destination_dir}/thumbnails/${filename}"

    # Limpa o arquivo temporário
    rm "/tmp/${filename}"

    # Retorna o novo caminho da imagem para atualização do JSON
    echo "${filename}"
}

# Detecta o sistema operacional
OS="$(uname -s)"
case "${OS}" in
    Linux*)     OS=Linux;;
    Darwin*)    OS=macOS;;
    *)          OS="UNKNOWN:${OS}"
esac

# Verifica e coleta argumentos ou solicita interativamente
if [ "$#" -lt 5 ]; then
    echo "Algumas informações estão faltando. Responda às perguntas a seguir:"
    read -p "Caminho do arquivo JSON de entrada: " json_file_path
    read -p "Diretório de destino para as imagens: " destination_dir
    read -p "Tamanho desejado para as imagens (ex: 1024 para 1024x1024): " image_size
    read -p "Tamanho desejado para as miniaturas (ex: 256 para 256x256): " thumbnail_size
    read -p "Qualidade desejada para as imagens (ex: 85 para 85%): " quality
    read -p "Caminho completo do arquivo JSON de destino: " json_destination_path
else
    json_file_path="$1"
    destination_dir="$2"
    image_size="$3"
    thumbnail_size="$4"
    quality="$5"
    json_destination_path="$6"
fi

# Instala as dependências se solicitado na linha de comando (ou assume que já estão instaladas)
if [ "$7" == "true" ]; then
    install_dependencies
fi

# Remove as pastas existentes e recria-as
rm -rf "${destination_dir}/images" "${destination_dir}/thumbnails"
mkdir -p "${destination_dir}/images" "${destination_dir}/thumbnails"

# Prepara um arquivo temporário para o JSON atualizado
temp_json=$(mktemp)

# Inicializa o arquivo temporário com um array vazio
echo "[]" > "$temp_json"

# Lê o JSON e processa as imagens
jq -c '.[]' "$json_file_path" | while read -r line; do
    url=$(echo "$line" | jq -r '.imageUrl')
    new_filename=$(process_image "$url" "$destination_dir" "$image_size" "$thumbnail_size" "$quality")
    # Atualiza o JSON com o novo caminho da imagem
    updated_line=$(jq --arg newUrl "$new_filename" '.imageUrl = $newUrl' <<< "$line")
    # Adiciona o item atualizado ao arquivo temporário de JSON
    jq -c --argjson obj "$updated_line" '. += [$obj]' "$temp_json" > "$temp_json.tmp" && mv "$temp_json.tmp" "$temp_json"
done

# Move o conteúdo do arquivo temporário para o destino final
mv "$temp_json" "$json_destination_path"

echo "Processamento concluído. Imagens e arquivo JSON atualizado estão em '${destination_dir}' e '${json_destination_path}', respectivamente."
