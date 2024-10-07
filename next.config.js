// import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        TEST_ENV: "testikula"
    },
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'ladoga-travel.ru',
                pathname: '**'
            },
            {
                protocol: 'http',
                hostname: 'cms',
                port: '1337',
                pathname: '**'
            }
        ],
    }
};

module.exports = nextConfig;

const withVideos = require("next-videos");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withVideos(nextConfig));