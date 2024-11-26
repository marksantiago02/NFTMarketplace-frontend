/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config:any) => {
    config.externals.push("pino-pretty", "lokijs", "encoding"); // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "95.216.240.153",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
