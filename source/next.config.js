/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn-icons-png.flaticon.com',
         },
         {
            protocol: 'https',
            hostname: 'img.freepik.com',
         },
      ],
   },
   //output: "standalone",
};

module.exports = nextConfig;
