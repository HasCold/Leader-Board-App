/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ["@repo/ui"],
    async rewrites(){
      return [
           {
               source: '/api/prod/:path*', // Match any route starting with /api
               destination: 'http://localhost:4000/api/prod/:path*', // Proxy to the server on localhost:5000
           },
           {
            source: '/api/cons/:path*', // Match any route starting with /api
            destination: 'http://localhost:5000/api/cons/:path*', // Proxy to the server on localhost:5000
           }
         ]
   }
  };