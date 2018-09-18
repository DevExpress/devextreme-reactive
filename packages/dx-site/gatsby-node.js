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
}
