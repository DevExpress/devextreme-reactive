import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import { banner, external, babelrc, moduleName, globals } from '../../tools/rollup-utils';

export default {
  entry: 'src/index.js',
  sourceMap: true,
  targets: [
    {
      format: 'umd',
      dest: 'dist/dx-grid-core.umd.js',
    },
    {
      format: 'es',
      dest: 'dist/dx-grid-core.es.js',
    },
  ],
  moduleName: moduleName(__dirname),
  globals: globals(__dirname),
  external: external(__dirname),
  plugins: [
    babel(Object.assign({
      babelrc: false,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }, babelrc(__dirname))),
    license({
      sourceMap: true,
      banner,
    }),
  ],
};
