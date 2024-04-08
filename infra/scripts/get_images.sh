#!/bin/bash

# Instalar dependências necessárias
echo "Verificando e instalando dependências necessárias..."
sudo apt-get update
sudo apt-get install -y jq wget imagemagick

# Perguntar qual arquivo JSON abrir
echo "Digite o caminho completo do arquivo JSON que você deseja processar:"
read json_file_path

# Pedir ao usuário o diretório de destino para salvar as imagens.
echo "Digite o caminho do diretório onde você gostaria de salvar as imagens:"
read destination_dir

# Criar diretórios para as imagens e miniaturas, se não existirem.
mkdir -p "${destination_dir}/images"
mkdir -p "${destination_dir}/thumbnails"

# Pedir ao usuário o tamanho das imagens.
echo "Digite o tamanho desejado para as imagens (ex: 1024 para 1024x1024):"
read image_size
echo "Digite o tamanho desejado para as miniaturas (ex: 256 para 256x256):"
read thumbnail_size

# Função para gerar nomes de arquivo aleatórios.
generate_random_name() {
    cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1
}

# Função para processar e salvar cada imagem.
process_image() {
    local url="$1"
    local destination_dir="$2"
    local image_size="$3"
    local thumbnail_size="$4"
    local random_name=$(generate_random_name)
    local filename="${random_name}.webp"

    # Baixar a imagem.
    wget -q "${url}" -O "/tmp/${filename}"

    # Padronizar o tamanho da imagem para o especificado pelo usuário, cortando se necessário.
    convert "/tmp/${filename}" -resize "${image_size}x${image_size}^" -gravity center -extent "${image_size}x${image_size}" "${destination_dir}/images/${filename}"

    # Criar uma miniatura da imagem no tamanho especificado pelo usuário.
    convert "${destination_dir}/images/${filename}" -resize "${thumbnail_size}x${thumbnail_size}" "${destination_dir}/thumbnails/${filename}"
}

# Ler e processar cada entrada do arquivo JSON especificado.
jq -c '.[]' "${json_file_path}" | while read -r i; do
    url=$(echo "$i" | jq -r '.imageUrl')

    process_image "$url" "$destination_dir" "$image_size" "$thumbnail_size"
done

# Perguntar onde salvar o arquivo JSON atualizado.
echo "Digite o caminho do diretório onde você gostaria de salvar o arquivo JSON atualizado:"
read json_destination_dir

# Atualizar o arquivo JSON com as novas URLs das imagens e miniaturas.
jq '.[] |= . + {"imageUrl": ("'"${destination_dir}/images/"'" + (.id | split("-")[0]) + ".webp"), "thumbnailUrl": ("'"${destination_dir}/thumbnails/"'" + (.id | split("-")[0]) + ".webp")}' "${json_file_path}" > "${json_destination_dir}/updated_products.json"

echo "Processamento concluído. Imagens e arquivo JSON atualizado estão em '${destination_dir}' e '${json_destination_dir}', respectivamente."
