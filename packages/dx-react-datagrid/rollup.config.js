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
      dest: 'dist/dx-react-datagrid.cjs.js',
    },
    {
      format: 'es',
      dest: 'dist/dx-react-datagrid.es.js',
    },
  ],
  external: [
    'react',
    '@devexpress/dx-react-core',
    '@devexpress/dx-datagrid-core',
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      extensions: ['.js', '.jsx'],
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
  onwarn: ({ code, message, loc, frame }) => {
    if (code === 'MISSING_EXPORT' && message.indexOf('es6.object.to-string.js') > -1)
      return;
    if (loc) {
      console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
      if (frame) console.warn(frame);
    } else {
      console.warn(message);
    }
  }
};
