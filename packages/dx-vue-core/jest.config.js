import { URL } from 'url';

export default {
  setupFiles: [
    new URL('./setup-vue.js', import.meta.url).pathname,
  ],
};
