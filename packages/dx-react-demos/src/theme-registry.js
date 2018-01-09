/* eslint-disable global-require */

export const themes = [{
  name: 'material-ui',
  title: 'Material UI',
  DemoContainer: require('./material-ui/demo-container').default,
}, {
  name: 'bootstrap3',
  title: 'Bootstrap 3',
  DemoContainer: require('./bootstrap3/demo-container').default,
}];
