import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const banner =
`Bundle of <%= pkg.name %>
Generated: <%= moment().format('YYYY-MM-DD') %>
Version: <%= pkg.version %>
License: https://js.devexpress.com/Licensing`;

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
  external: [],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    license({
      sourceMap: true,
      banner,
    }),
  ],
};
