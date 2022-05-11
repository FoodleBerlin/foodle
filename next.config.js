/** @type {import('next').NextConfig} */
// Prevents XSS, Clickjacking and Injection Attacks
// 
// 'unsafe-inline' is not ideal, but also very little can be achieved with CSS XSS attacks (Even Twitter and Spotify use it and they have very high security rating)
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  child-src ${process.env.CLIENT_URL};
  style-src 'unsafe-inline'; 
  font-src 'self';  
`
const securityHeaders = [
  // { 
  // NOT NECESSARY currently since we are deploying to Vercel which automatically does this
  // /** Enforces https connections for 2 years **/ 
  // key: 'Strict-Transport-Security',
  // value: 'max-age=63072000; includeSubDomains; preload'
  // }
  { 
    /** Detects reflected XSS attacks and prevents them **/ 
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  { 
    /** Disables site from being displayed in iframe, prevents clickjacking **/
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  { 
    /** Allows geolocation to autogenerate a user's zip, disables Google's FLoC to protect user's privacy from Google **/
    key: 'Permissions-Policy',
    value: 'geolocation=(), interest-cohort=()' 
  },
  { 
    /** Prevents browser from guessing content-type if header is not explicitly set, can prevent XSS exploits **/
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["foodle-bucket.s3.eu-central-1.amazonaws.com"]
  },
  async headers() {
    return [
      {
        // Applies security headers to all routes in the application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
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
