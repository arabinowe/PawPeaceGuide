/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/guides/how-pet-insurance-deductibles-work",
        destination: "/guides/pet-insurance-deductibles",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
