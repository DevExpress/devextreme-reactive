const path = require('path');
const { version } = require('../../lerna.json');

module.exports = {
  siteMetadata: {
    title: 'DevExterme Reactive',
    version,
  },
  pathPrefix: '/devextreme-reactive',
  plugins: [
    // React Core
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/core|docs',
        path: path.join(__dirname, '../dx-react-core/docs/'),
      },
    },
    // React Grid
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/grid|demos',
        path: path.join(__dirname, '../dx-react-grid/demos/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/grid|docs',
        path: path.join(__dirname, '../dx-react-grid/docs/'),
      },
    },
    // React Chart
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/chart|demos',
        path: path.join(__dirname, '../dx-react-chart/demos/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/chart|docs',
        path: path.join(__dirname, '../dx-react-chart/docs/'),
      },
    },
    // Vue Grid
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'vue/grid|demos',
        path: path.join(__dirname, '../dx-vue-grid/demos/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'vue/grid|docs',
        path: path.join(__dirname, '../dx-vue-grid/docs/'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
  ],
};
