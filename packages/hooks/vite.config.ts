import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    build: {
      target: 'es2020',
      outDir: './dist',
      lib: {
        entry: './src/index.ts',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
    },
    plugins: [
      tsconfigPaths(),
      qwikVite(),
      dts({
        cleanVueFileName: true,
        copyDtsFiles: true,
        outDir: './dist/types',
        include: [
          './src'
        ],
      }),
    ],
  };
});
