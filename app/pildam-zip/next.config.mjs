const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  import('velite').then((m) => m.build({ watch: isDev, clean: !isBuild }));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
