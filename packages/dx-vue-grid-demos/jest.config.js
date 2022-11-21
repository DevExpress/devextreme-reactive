import { URL } from 'url';

export default {
  moduleNameMapper: {
    '\\.css$': new URL('./css-stub.js', import.meta.url).pathname,
    '^vue$': 'vue/dist/vue.common.js',
  },
  setupFiles: [
    new URL('./setup-vue.js', import.meta.url).pathname,
  ],
};
