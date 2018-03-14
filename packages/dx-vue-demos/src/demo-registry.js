/* eslint-disable quote-props */
/* eslint-disable global-require */
/* eslint-disable no-template-curly-in-string */

module.exports.demos = {
  'core-action': {
    'parameterized-action': {
      'none': {
        demo: require('../src/demo-sources/core-action/parameterized-action.js').default,
      },
    },
    'simple-action': {
      'none': {
        demo: require('../src/demo-sources/core-action/simple-action.js').default,
      },
    },
  },
  'core-basic': {
    'plugin-component': {
      'none': {
        demo: require('../src/demo-sources/core-basic/plugin-component.js').default,
      },
    },
    'plugin-host-component': {
      'none': {
        demo: require('../src/demo-sources/core-basic/plugin-host-component.js').default,
      },
    },
  },
  'core-getter': {
    'computed-getter': {
      'none': {
        demo: require('../src/demo-sources/core-getter/computed-getter.js').default,
      },
    },
    'value-getter': {
      'none': {
        demo: require('../src/demo-sources/core-getter/value-getter.js').default,
      },
    },
  },
  'core-template': {
    'template-overriding': {
      'none': {
        demo: require('../src/demo-sources/core-template/template-overriding.js').default,
      },
    },
    'template-parameters': {
      'none': {
        demo: require('../src/demo-sources/core-template/template-parameters.js').default,
      },
    },
    'template-placeholder': {
      'none': {
        demo: require('../src/demo-sources/core-template/template-placeholder.js').default,
      },
    },
  },
};
