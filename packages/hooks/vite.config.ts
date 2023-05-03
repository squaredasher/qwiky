import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import dtsPlugin from 'vite-plugin-dts'

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
      dtsPlugin({
        include: ['./src/**/*.ts', './src/**/*.tsx'],
        skipDiagnostics: false,
        staticImport: true,
        outputDir: ['./dist/types'],
        cleanVueFileName: false,
      }),
      qwikVite()
    ],
  };
});
