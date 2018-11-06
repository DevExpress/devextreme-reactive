/* eslint-disable global-require */

export const themes = [{
  name: 'material-ui',
  title: 'Material-UI',
  variants: [{
    name: 'light',
    title: 'Material-UI Light',
    DemoContainer: require('./theme-sources/material-ui/demo-container').default,
    links: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
  }, {
    name: 'dark',
    title: 'Material-UI Dark',
    DemoContainer: require('./theme-sources/material-ui/demo-container').Dark,
    links: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
  }],
}];
