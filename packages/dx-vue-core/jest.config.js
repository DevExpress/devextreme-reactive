import { fileURLToPath } from 'url';
import path from 'path';

export default {
  setupFiles: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './setup-vue.js',
    ),
  ],
};
