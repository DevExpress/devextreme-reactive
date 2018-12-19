import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import { banner, external, globals } from '../../tools/rollup-utils';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main, format: 'umd', name: pkg.globalName, sourcemap: true, globals: globals(),
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: external(__dirname),
  plugins: [
    resolve({
      extensions: ['.ts', '.tsx', '.js'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      extensions: ['.ts', '.tsx', '.js']
    }),
    license({
      banner,
    }),
  ],
};
