const fs = require('fs');
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const sourceName = getNode(node.parent).sourceInstanceName;
    const [technology, section] = sourceName.split('|');
    createNodeField({
      node,
      name: 'slug',
      value: path.join(technology, section, createFilePath({ node, getNode })),
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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
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
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/page.js'),
          context: {
            slug: node.fields.slug,
          },
        })
      });
      resolve()
    })
  })
};

const setupFileSynchronization = (src, dest) => {
  console.log(`sync ${src} -> ${dest}`);
  fs.watchFile(src, () => {
    try {
      fs.unlinkSync(dest);
    } catch(e) {}
    try {
      fs.linkSync(src, dest);
    } catch(e) {}
  });
}

exports.onPostBootstrap = () => {
  setupFileSynchronization('../dx-react-grid-demos/dist/index.js', './public/static/react-grid-demos.js');
  setupFileSynchronization('../dx-react-chart-demos/dist/index.js', './public/static/react-chart-demos.js');
  setupFileSynchronization('../dx-vue-grid-demos/dist/index.js', './public/static/vue-grid-demos.js');
};
