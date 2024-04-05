/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.nike.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.adidas.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.puma.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'reebok.ca',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;