/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.bfldr.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.slack-edge.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.bfldr.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.slack-edge.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
