import { fileURLToPath } from 'url';
import path from 'path';

export default {
  moduleNameMapper: {
    '\\.css$': path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './css-stub.js',
    ),
    '^vue$': 'vue/dist/vue.common.js',
  },
  setupFiles: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      './setup-vue.js',
    ),
  ],
};
