const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "srxumrencqgqjfckzmpg.supabase.co",
        pathname: "/storage/v1/object/public/hotel-images/**",
      },
      {
        protocol: "https",
        hostname: "srxumrencqgqjfckzmpg.supabase.co",
        pathname: "/storage/v1/object/public/program-banners/**",
      },
    ],
  },
};

module.exports = nextConfig;
