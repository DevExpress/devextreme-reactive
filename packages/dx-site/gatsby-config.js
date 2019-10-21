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
    // React Scheduler
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/scheduler|demos',
        path: path.join(__dirname, '../dx-react-scheduler/demos/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/scheduler|docs',
        path: path.join(__dirname, '../dx-react-scheduler/docs/'),
      },
    },
    // React common docs
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'react/common|docs',
        path: path.join(__dirname, '../dx-react-common/docs/'),
      },
    },
    // inline svg images
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/react.+svg/,
        },
      },
    },
    // transform .md files
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
          'gatsby-remark-relative-linker',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-1384678-22',
      },
    },
  ],
};
