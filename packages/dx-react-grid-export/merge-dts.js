import { fileURLToPath } from 'url';
import { dirname } from 'path';

import buildDefinitions from '../../scripts/merge-dts.js';
import { copyCommonJsTypes, getPackageInfo, getDtsOutFile } from '../../scripts/utils.js';

const packageDirectory = dirname(fileURLToPath(import.meta.url));
const pkg = getPackageInfo(packageDirectory);
const dtsOutFile = getDtsOutFile(packageDirectory, pkg.types);

buildDefinitions(packageDirectory, true);
copyCommonJsTypes(dtsOutFile);
