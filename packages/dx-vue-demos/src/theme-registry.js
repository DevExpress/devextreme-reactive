/* eslint-disable global-require */

export const themes = [{
  name: 'none',
  title: 'None',
  variants: [{
    name: 'default',
    title: 'None',
    DemoContainer: require('./theme-sources/none/demo-container').default,
    links: [
      'https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.css',
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
    ],
  }],
}];
