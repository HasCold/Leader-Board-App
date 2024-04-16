/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ["@repo/ui"],
    async rewrites(){
      return [
           {
               source: '/prod/api/:path*', // Match any route starting with /api
               destination: 'http://localhost:4000/prod/api/:path*', // Proxy to the server on localhost:5000
           },
           {
            source: '/cons/api/:path*', // Match any route starting with /api
            destination: 'http://localhost:5000/cons/api/:path*', // Proxy to the server on localhost:5000
           }
         ]
   }
  };