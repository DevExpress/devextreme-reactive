/* eslint-disable global-require */

export const themes = [{
  name: 'material-ui',
  title: 'Material UI',
  variants: [{
    name: 'light',
    title: 'Material UI Light',
    DemoContainer: require('./material-ui/demo-container').default,
  }, {
    name: 'dark',
    title: 'Material UI Dark',
    DemoContainer: require('./material-ui/demo-container').Dark,
  }],
}, {
  name: 'bootstrap3',
  title: 'Bootstrap 3',
  variants: [{
    name: 'default',
    title: 'Bootstrap 3',
    DemoContainer: require('./bootstrap3/demo-container').default,
  }, {
    name: 'journal',
    title: 'Bootstrap 3 (Bootswatch Journal)',
    DemoContainer: require('./bootstrap3/demo-container').Journal,
  }, {
    name: 'darkly',
    title: 'Bootstrap 3 (Bootswatch Darkly)',
    DemoContainer: require('./bootstrap3/demo-container').Darkly,
  }, {
    name: 'united',
    title: 'Bootstrap 3 (Bootswatch United)',
    DemoContainer: require('./bootstrap3/demo-container').United,
  }, {
    name: 'custom',
    title: 'Bootstrap 3 (Custom)',
    DemoContainer: require('./bootstrap3/demo-container').Custom,
  }],
}];
