const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'DevExterme Reactive',
  },
  pathPrefix: '/devextreme-reactive',
  plugins: [
    // React Grid
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'react/grid|demos',
        path: path.join(__dirname, '../dx-react-grid/demos/'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'react/grid|docs',
        path: path.join(__dirname, '../dx-react-grid/docs/'),
      },
    },
    // React Chart
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'react/chart|demos',
        path: path.join(__dirname, '../dx-react-chart/demos/'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'react/chart|docs',
        path: path.join(__dirname, '../dx-react-chart/docs/'),
      },
    },
    // Vue Grid
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'vue/grid|demos',
        path: path.join(__dirname, '../dx-vue-grid/demos/'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'vue/grid|docs',
        path: path.join(__dirname, '../dx-vue-grid/docs/'),
      },
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass'
  ],
}
