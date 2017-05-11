import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import { banner, external, babelrc, moduleName, globals } from '../../tools/rollup-utils';

export default {
  entry: 'src/index.js',
  sourceMap: true,
  targets: [
    {
      format: 'umd',
      dest: 'dist/dx-react-grid-bootstrap3.umd.js',
    },
    {
      format: 'es',
      dest: 'dist/dx-react-grid-bootstrap3.es.js',
    },
  ],
  moduleName: moduleName(__dirname),
  globals: globals(__dirname),
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
      sourceMap: true,
      banner,
    }),
  ],
};

