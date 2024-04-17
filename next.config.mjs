/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // because of ssg
    unoptimized: true,
  },
  // to prevent multiple calls to getStaticProps
  reactStrictMode: false,
  experimental: {
    // to prevent suspense fallback
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
