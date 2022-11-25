import fsExtra from 'fs-extra';
import { join } from 'path';

fsExtra.removeSync(join(process.cwd(), 'dist'));
