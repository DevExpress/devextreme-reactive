import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import { banner, external, babelrc, stubProcess } from '../../tools/rollup-utils';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    sourcemap: true,
    output: [
      { file: pkg.main, format: 'cjs' },
    ],
    external: external(__dirname),
    intro: stubProcess,
    plugins: [
      resolve({
        main: false,
        extensions: ['.js', '.jsx'],
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
  },
  {
    input: 'src/index.js',
    sourcemap: true,
    output: [
      { file: pkg.module, format: 'es' },
    ],
    external: external(__dirname),
    plugins: [
      resolve({
        main: false,
        extensions: ['.js', '.jsx'],
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
  },
];
