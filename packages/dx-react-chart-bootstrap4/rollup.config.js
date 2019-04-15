import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import { banner, external, globals, stubProcess } from '../../tools/rollup-utils';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'umd', name: pkg.globalName, sourcemap: true, globals: globals(), intro: stubProcess },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: external(__dirname),
  plugins: [
    sass({ output: pkg.styles, include: ['../**/*.scss'] }),
    resolve({
      main: false,
      extensions: ['.js', '.jsx'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      rootMode: 'upward',
    }),
    license({
      banner,
    }),
  ],
};
