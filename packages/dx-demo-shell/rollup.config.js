import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only'
import { external, babelrc } from '../../tools/rollup-utils';
import pkg from './package.json';

export default {
  input: 'src/index.jsx',
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: external(__dirname),
  plugins: [
    css({ output: pkg.styles }),
    resolve({
      main: false,
      extensions: ['.js', '.jsx'],
    }),
    babel(Object.assign({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }, babelrc(__dirname))),
  ],
};
