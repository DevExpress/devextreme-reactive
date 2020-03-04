const fs = require('fs');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const pageNavigation = require('./page-navigation.json');
const { pathPrefix } = require('./gatsby-config');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const sourceName = getNode(node.parent).sourceInstanceName;
    const [technology, section] = sourceName.split('|');
    createNodeField({
      node,
      name: 'slug',
      value: path.posix.join(technology, section, createFilePath({ node, getNode })),
    });
    createNodeField({
      node,
      name: 'technology',
      value: technology,
    });
    createNodeField({
      node,
      name: 'section',
      value: section,
    });
  }
};

const getDocSection = (technology, section) => (
  pageNavigation[technology].docs.find(item => item.title === section)
);

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  Object.keys(pageNavigation)
    .forEach((technology) => {
      if (pageNavigation[technology].demos) {
        createRedirect({
          fromPath: `/${technology}/demos/`,
          toPath: pageNavigation[technology].demos.find(item => item.title === 'Demos').items[0].path,
          redirectInBrowser: true,
        });
      }
      if (pageNavigation[technology].docs) {
        const guides = getDocSection(technology, 'Guides');
        if (guides) {
          createRedirect({
            fromPath: `/${technology}/docs/`,
            toPath: guides.items[0].path,
            redirectInBrowser: true,
          });
          createRedirect({
            fromPath: `/${technology}/docs/guides/`,
            toPath: guides.items[0].path,
            redirectInBrowser: true,
          });
        }

        const reference = getDocSection(technology, 'API Reference');
        if (reference) {
          createRedirect({
            fromPath: `/${technology}/docs/reference/`,
            toPath: reference.items[0].path,
            redirectInBrowser: true,
          });
        }
      }
    });

  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/page.jsx'),
          context: {
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};

const setupFileSynchronization = (src, dest) => {
  try {
    fs.unlinkSync(dest);
  } catch (e) { /**/ }
  try {
    fs.linkSync(src, dest);
  } catch (e) { /**/ }
  fs.watchFile(src, () => {
    try {
      fs.unlinkSync(dest);
    } catch (e) { /**/ }
    try {
      fs.linkSync(src, dest);
    } catch (e) { /**/ }
  });
};

exports.onPostBootstrap = () => {
  setupFileSynchronization('../dx-react-grid-demos/dist/index.js', './public/static/react-core-demos.js');
  setupFileSynchronization('../dx-react-chart-demos/dist/index.js', './public/static/react-chart-demos.js');
  setupFileSynchronization('../dx-react-grid-demos/dist/index.js', './public/static/react-grid-demos.js');
  setupFileSynchronization('../dx-react-scheduler-demos/dist/index.js', './public/static/react-scheduler-demos.js');
  setupFileSynchronization('../dx-react-common/dist/index.js', './public/static/react-common-demos.js');
};

const createRedirectPage = ({ fromPath, toPath }) => {
  const page = `
    <!doctype html>
    <html lang="en">
    <head>
      <meta http-equiv="refresh" content="0; url=${pathPrefix}${toPath}" />
    </head>
    <body></body>
    </html>
  `;
  fs.writeFileSync(path.join(__dirname, 'public', fromPath, 'index.html'), page);
};

exports.onPostBuild = () => {
  Object.keys(pageNavigation)
    .forEach((technology) => {
      if (pageNavigation[technology].demos) {
        createRedirectPage({
          fromPath: `/${technology}/demos/`,
          toPath: pageNavigation[technology].demos.find(item => item.title === 'Demos').items[0].path,
        });
      }
      if (pageNavigation[technology].docs) {
        const guides = getDocSection(technology, 'Guides');
        if (guides) {
          createRedirectPage({
            fromPath: `/${technology}/docs/`,
            toPath: guides.items[0].path,
          });
          createRedirectPage({
            fromPath: `/${technology}/docs/guides/`,
            toPath: guides.items[0].path,
          });
        }

        const reference = getDocSection(technology, 'API Reference');
        if (reference) {
          createRedirectPage({
            fromPath: `/${technology}/docs/reference/`,
            toPath: reference.items[0].path,
          });
        }
      }
    });
};
