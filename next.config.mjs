/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Permite cualquier subdominio y rutas de Cloudinary
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /sequelize/,
      resolve: {
        fullySpecified: false, // Soluciona el problema de la dependencia crítica
      },
    });
    return config;
  },
};

export default nextConfig;
