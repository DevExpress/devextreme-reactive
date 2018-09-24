import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { banner, external, babelrc, globals } from '../../tools/rollup-utils';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'umd', name: pkg.globalName, sourcemap: true, globals: globals() },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: external(__dirname),
  plugins: [
    resolve({
      main: true,
      extensions: ['.js', '.jsx'],
    }),
    commonjs({
      include: '../../node_modules/babel-helper-vue-jsx-merge-props/**',
    }),
    babel(Object.assign({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }, babelrc(__dirname))),
    license({
      banner,
    }),
  ],
};
