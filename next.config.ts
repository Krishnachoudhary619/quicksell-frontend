import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "quicksell-product-images.s3.ap-south-1.amazonaws.com"
    ],
  },
};

export default nextConfig;