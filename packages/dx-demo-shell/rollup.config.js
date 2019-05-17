import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import { external } from '../../tools/rollup-utils';
import pkg from './package.json';

export default {
  input: 'src/index.jsx',
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: external(__dirname),
  plugins: [
    sass({ output: pkg.styles, include: ['../**/*.css'] }),
    resolve({
      main: false,
      extensions: ['.js', '.jsx'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      rootMode: 'upward',
    }),
  ],
};
