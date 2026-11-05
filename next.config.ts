import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * /our-solution showed the Lite, Pro and Custom packages. The website brief
   * (Drive, November 3, 2026) replaces it with /plans; the old address stays
   * live for links already sent, as a permanent redirect (308).
   * Source: node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md
   */
  async redirects() {
    return [{ source: "/our-solution", destination: "/plans", permanent: true }];
  },
};

export default nextConfig;
