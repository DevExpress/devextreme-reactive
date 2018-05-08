/* eslint-disable global-require */

export const themes = [{
  name: 'none',
  title: 'Bootstrap 4',
  variants: [{
    name: 'default',
    title: 'Bootstrap 4',
    DemoContainer: require('./theme-sources/none/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
    ],
  }, {
    name: 'cyborg',
    title: 'Bootstrap 4 (Bootswatch Cyborg)',
    DemoContainer: require('./theme-sources/none/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
      'https://bootswatch.com/4/cyborg/bootstrap.min.css',
    ],
  }, {
    name: 'custom',
    title: 'Bootstrap 4 (Custom)',
    DemoContainer: require('./theme-sources/none/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
    ],
    editableLink: 'https://bootswatch.com/4/sketchy/bootstrap.min.css',
  }],
}];
