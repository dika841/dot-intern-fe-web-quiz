/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cloudflare-ipfs.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "loremflickr.com",
        },
      ],
    },
  
    async redirects() {
      return [
        {
          source: "/",
          destination: "/landing",
          permanent: true,
        },
      ];
    },
  
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,DELETE,PATCH,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;