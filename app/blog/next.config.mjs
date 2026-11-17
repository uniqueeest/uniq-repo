// velite가 next dev/build와 함께 돌도록 한다 (https://velite.js.org/guide/with-nextjs)
const isDev = process.argv.includes('dev');
const isBuild = process.argv.includes('build');
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  await import('velite').then((m) => m.build({ watch: isDev, clean: isBuild }));
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
