/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [{
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**'
            },
            {
                protocol: 'http',
                hostname: 'cms',
                pathname: '**'
            },
        ],
    }
};

export default nextConfig;