const { join, sep } = require('path');
const { readFileSync, existsSync } = require('fs');
const rimraf = require('rimraf');
const replace = require('replace-in-file');
const dts = require('dts-bundle');


module.exports = (packageDirectory) => {
  const pkg = JSON.parse(readFileSync(join(packageDirectory, 'package.json')));
  const dtsOutFile = join(packageDirectory, pkg.types);
  const dtsPath = join(packageDirectory, 'dist', 'dts');
  const indexDts = getIndexDts(packageDirectory, dtsPath);

  replace.sync({
    files: `${dtsPath}/**/*.ts`,
    from: 'export {};',
    to: '',
  });

  dts.bundle({
    name: pkg.name,
    main: indexDts,
    out: dtsOutFile,
    indent: '  ',
    outputAsModuleFolder: true,
    headerPath: 'none',
  });

  rimraf(dtsPath, () => {});
}

const getIndexDts = (packageDirectory, dtsPath) => {
  let indexDts = join(dtsPath, 'index.d.ts');

  if (!existsSync(indexDts)) {
    const parentDir = packageDirectory.split(sep).pop();
    indexDts = join(dtsPath, parentDir, 'src', 'index.d.ts');
  }

  return indexDts;
}
