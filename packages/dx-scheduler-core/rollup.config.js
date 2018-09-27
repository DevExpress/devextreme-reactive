import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
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
