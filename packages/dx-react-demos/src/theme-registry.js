/* eslint-disable global-require */

export const themes = [{
  name: 'material-ui',
  title: 'Material UI',
  variants: [{
    name: 'light',
    title: 'Material UI Light',
    DemoContainer: require('./theme-sources/material-ui/demo-container').default,
  }, {
    name: 'dark',
    title: 'Material UI Dark',
    DemoContainer: require('./theme-sources/material-ui/demo-container').Dark,
  }],
}, {
  name: 'bootstrap4',
  title: 'Bootstrap 4',
  variants: [{
    name: 'default',
    title: 'Bootstrap 4',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').default,
  }, {
    name: 'cyborg',
    title: 'Bootstrap 4 (Bootswatch Cyborg)',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').Cyborg,
  }, {
    name: 'custom',
    title: 'Bootstrap 4 (Custom)',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').Custom,
  }],
}, {
  name: 'bootstrap3',
  title: 'Bootstrap 3',
  variants: [{
    name: 'default',
    title: 'Bootstrap 3',
    DemoContainer: require('./theme-sources/bootstrap3/demo-container').default,
  }, {
    name: 'darkly',
    title: 'Bootstrap 3 (Bootswatch Darkly)',
    DemoContainer: require('./theme-sources/bootstrap3/demo-container').Darkly,
  }, {
    name: 'custom',
    title: 'Bootstrap 3 (Custom)',
    DemoContainer: require('./theme-sources/bootstrap3/demo-container').Custom,
  }],
}];
