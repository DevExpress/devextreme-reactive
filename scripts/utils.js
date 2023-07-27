import { existsSync, copyFileSync } from 'fs';

const getCommonJsTypesPath = dtsPath => dtsPath.replace(/.ts$/, '.cts');

export const copyCommonJsTypes = (dtsPath) => {
  if (existsSync(dtsPath)) {
    copyFileSync(dtsPath, getCommonJsTypesPath(dtsPath));
  }
};
