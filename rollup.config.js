import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';


function pgl(plugins=[]) {
  return [
    commonjs(),
    ...plugins
  ];
}

const srcEntry = pkg.source;

export default [
  {
    input: srcEntry,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: pgl()
  }
];