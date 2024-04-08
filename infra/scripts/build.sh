#!/bin/bash

# ⚙️ Verifica se o wget está instalado, se não, tenta instalá-lo
if ! command -v wget &> /dev/null; then
    echo "wget não encontrado. Tentando instalar..."
    apt update -y
    apt install -y wget
fi

# ⚙️ Atualiza o sistema e instala dependências necessárias
apt update -y
apt install -y build-essential libpcre3 libpcre3-dev zlib1g-dev libssl-dev libtool cmake git wget brotli libbrotli-dev

# ⚙️ Verificar se usuário e grupo nginx existem, senão cria
if ! id "nginx" &>/dev/null; then
    groupadd -r nginx
    useradd -r -g nginx -s /bin/false nginx
fi

# ⚙️ Definindo variáveis
NGINX_VERSION="1.24.0"
BROTLI_GIT="https://github.com/google/ngx_brotli.git"
NGINX_SOURCE="http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz"
NGINX_CONF_DIR="/etc/nginx"

# ⚙️ Baixando e descompactando o código-fonte do Nginx
echo "Baixando Nginx versão $NGINX_VERSION..."
wget -qO- $NGINX_SOURCE | tar -zxv || { echo "Falha ao baixar e descompactar o Nginx"; exit 1; }

# ⚙️ Entra no diretório do Nginx
NGINX_DIR="nginx-$NGINX_VERSION"
cd "$NGINX_DIR" || { echo "Diretório do Nginx não encontrado"; exit 1; }

# Baixando o módulo ngx_brotli com submódulos (incluindo brotli)
echo "Baixando ngx_brotli..."
git clone --recurse-submodules $BROTLI_GIT || { echo "Falha ao baixar ngx_brotli"; exit 1; }

# Configurando o Nginx com o módulo Brotli
echo "Configurando o Nginx com o módulo Brotli..."
./configure --prefix=/usr/share/nginx \
            --sbin-path=/usr/sbin/nginx \
            --modules-path=/usr/lib/nginx/modules \
            --conf-path=/etc/nginx/nginx.conf \
            --error-log-path=/var/log/nginx/error.log \
            --http-log-path=/var/log/nginx/access.log \
            --pid-path=/run/nginx.pid \
            --lock-path=/var/lock/nginx.lock \
            --http-client-body-temp-path=/var/cache/nginx/client_temp \
            --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
            --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
            --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
            --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
            --user=nginx \
            --group=nginx \
            --with-compat \
            --add-dynamic-module=./ngx_brotli \
            --with-threads \
            --with-http_ssl_module \
            --with-http_v2_module \
            --with-http_realip_module \
            --with-http_addition_module \
            --with-http_sub_module \
            --with-http_dav_module \
            --with-http_flv_module \
            --with-http_mp4_module \
            --with-http_gunzip_module \
            --with-http_gzip_static_module \
            --with-http_random_index_module \
            --with-http_secure_link_module \
            --with-http_stub_status_module \
            --with-mail \
            --with-mail_ssl_module \
            --with-file-aio \
            --with-http_slice_module || { echo "Falha ao configurar o Nginx"; exit 1; }

# Compilando e instalando o Nginx
echo "Compilando e instalando o Nginx..."
make && make install || { echo "Falha ao compilar ou instalar o Nginx"; exit 1; }

echo "Nginx e o módulo Brotli foram instalados com sucesso!"

# Atualiza link simbólico para garantir que o comando nginx aponte para a nova instalação
ln -sf /usr/sbin/nginx /usr/bin/nginx

# Limpa diretório modules-enabled para remover módulos potencialmente incompatíveis
echo "Preparando diretório de módulos habilitados..."
MODULES_ENABLED_DIR="/etc/nginx/modules-enabled"
if [ -d "$MODULES_ENABLED_DIR" ]; then
    rm -rf "${MODULES_ENABLED_DIR:?}"/*
else
    mkdir -p "$MODULES_ENABLED_DIR"
fi

# Adiciona o Brotli ao config
sed -i '/include \/etc\/nginx\/modules-enabled\/\*.conf;/a load_module modules/ngx_http_brotli_filter_module.so;\nload_module modules/ngx_http_brotli_static_module.so;' /etc/nginx/nginx.conf

# Desativa a exibição da versao do Ngins
sudo sed -i '/http {/a \\tserver_tokens off;' /etc/nginx/nginx.conf && echo "✅ Versão do Nginx ocultada."

echo "Configuração dos módulos completada."

# Cria pastas de cache do nginx
mkdir -p /var/cache/nginx/client_temp
mkdir -p /var/cache/nginx/proxy_temp
mkdir -p /var/cache/nginx/fastcgi_temp
mkdir -p /var/cache/nginx/uwsgi_temp
mkdir -p /var/cache/nginx/scgi_temp

# Substitua 'www-data' pelo usuário do Nginx no seu sistema, se for diferente.
chown -R www-data:www-data /var/cache/nginx
chmod 700 /var/cache/nginx/*