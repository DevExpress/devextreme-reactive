const path = require('path');

module.exports = {
  moduleNameMapper: {
    '\\.css$': path.join(__dirname, './css-stub.js'),
    '^vue$': 'vue/dist/vue.common.js',
  },
  setupFiles: [
    path.join(__dirname, './setup-vue.js'),
  ],
};
