// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 's3.ap-south-1.amazonaws.com',
//         // port: '',
//         // pathname: 'cozzy.corner/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./image/loader.js",
  },
  trailingSlash: true,
};

export default nextConfig;
