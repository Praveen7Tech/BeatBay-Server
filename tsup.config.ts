import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],  // your entry files
  outDir: 'dist',            // output directory
  format: ['esm'],           // CommonJS for Node.js
  target: 'node18',          // Node version target
  sourcemap: true,           // optional: generate source maps
  clean: true,               // clean dist folder before build
  watch: process.env.NODE_ENV === 'development', // watch in dev
  dts: true,                 // generate TypeScript declaration files (.d.ts)
});
