/* eslint-disable global-require */

export const themes = [{
  name: 'none',
  title: 'None',
  variants: [{
    name: 'default',
    title: 'None',
    DemoContainer: require('./theme-sources/none/demo-container').default,
  }],
}];
