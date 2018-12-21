// import babel from 'rollup-plugin-babel';
import license from 'rollup-plugin-license';
import typescript from 'rollup-plugin-typescript2';
import replace from "rollup-plugin-replace";
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
    typescript({
      typescript: require('typescript'),
      clean: true
    }),
    replace({
      "/** @class */": "/*#__PURE__*/",
      delimiters: ["", ""],
    }),
    // babel({
    //   runtimeHelpers: true,
    //   exclude: 'node_modules/**',
    //   extensions: ['.ts', '.tsx', '.js']
    // }),
    license({
      banner,
    }),
  ],
};
