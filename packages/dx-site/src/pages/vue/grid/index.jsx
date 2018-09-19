import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../../../components/layout';

const IndexPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            totalCount
            edges {
              node {
                id
                frontmatter {
                  title
                }
                excerpt
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <h3>
                {node.frontmatter.title}
                {' '}
                <span>
                  —
                  {' '}
                  {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    />
  </Layout>
);

export default IndexPage;
