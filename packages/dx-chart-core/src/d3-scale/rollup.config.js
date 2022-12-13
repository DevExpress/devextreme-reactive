import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/d3-scale/d3-scale-reexport.js',
  output: [
    {
      file: './src/d3-scale/index.js', format: 'es', name: 'd3-cjs', globals: 'd3CJS',
    },
  ],
  plugins: [
    commonjs({
      include: ['node_modules/**'],
      ignoreGlobal: false,
      sourceMap: false,
    }),

    nodeResolve({
      mainFields: ['module', 'main'],
    }),
  ],
};
