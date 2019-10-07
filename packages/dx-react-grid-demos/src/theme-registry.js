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
    name: 'cyborg',
    title: 'Bootstrap 4 (Bootswatch Cyborg)',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
      'https://bootswatch.com/4/cyborg/bootstrap.min.css',
    ],
  }, {
    name: 'custom',
    title: 'Bootstrap 4 (Custom)',
    DemoContainer: require('./theme-sources/bootstrap4/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
    ],
    editableLink: 'https://bootswatch.com/4/sketchy/bootstrap.min.css',
  }],
}, {
  name: 'bootstrap3',
  title: 'Bootstrap 3',
  variants: [{
    name: 'default',
    title: 'Bootstrap 3',
    links: [
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    ],
  }, {
    name: 'darkly',
    title: 'Bootstrap 3 (Bootswatch Darkly)',
    links: [
      'https://bootswatch.com/3/darkly/bootstrap.min.css',
    ],
  }, {
    name: 'custom',
    title: 'Bootstrap 3 (Custom)',
    editableLink: 'https://bootswatch.com/3/journal/bootstrap.min.css',
  }],
}];
