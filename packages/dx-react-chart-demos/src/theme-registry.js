/* eslint-disable global-require */

export const themes = [{
  name: 'material-ui',
  title: 'Material-UI',
  variants: [{
    name: 'light',
    title: 'Material-UI Light',
    DemoContainer: require('./theme-sources/material-ui/demo-container').default,
    links: ['https://fonts.googleapis.com/css?family=Roboto'],
  }, {
    name: 'dark',
    title: 'Material-UI Dark',
    DemoContainer: require('./theme-sources/material-ui/demo-container').Dark,
    links: ['https://fonts.googleapis.com/css?family=Roboto'],
  }],
}, {
  name: 'bootstrap4',
  title: 'Bootstrap 4',
  variants: [{
    name: 'default',
    title: 'Bootstrap 4',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
    ],
  }, {
    name: 'lux',
    title: 'Bootstrap 4 (Lux)',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
    ],
    editableLink: 'https://bootswatch.com/4/lux/bootstrap.min.css',
  }, {
    name: 'solar',
    title: 'Bootstrap 4 (Solar)',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
      'https://bootswatch.com/4/solar/bootstrap.min.css',
    ],
  }],
}];
