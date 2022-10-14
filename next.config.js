/** @type {import("next").NextConfig} */

const config = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = config;
