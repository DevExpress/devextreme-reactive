import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import { banner, external, babelrc } from '../../tools/rollup-utils';

export default {
  entry: 'src/index.js',
  sourceMap: true,
  targets: [
    {
      format: 'cjs',
      dest: 'dist/dx-datagrid-core.cjs.js',
    },
    {
      format: 'es',
      dest: 'dist/dx-datagrid-core.es.js',
    },
  ],
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
