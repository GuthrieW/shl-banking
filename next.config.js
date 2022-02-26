/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  source: '/*',
  headers: [
    {
      key: 'Access-Control-Allow-Origin',
      value: '*',
    },
  ],
}

module.exports = nextConfig
