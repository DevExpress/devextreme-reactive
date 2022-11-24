import { removeSync } from 'fs-extra';
import { join } from 'path';

removeSync(join(process.cwd(), 'dist'));
