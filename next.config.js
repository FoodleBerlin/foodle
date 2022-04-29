/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["foodle-bucket.s3.eu-central-1.amazonaws.com"]
  }, 
  async redirects() {
    return [
      {
        source: '/heroku-auth',
        destination: process.env.SERVER_URL+'api/auth',
        permanent: false,
        basePath: false
      },
    ]
  },
}

module.exports = nextConfig
