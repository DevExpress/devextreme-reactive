import React from 'react';
import Layout from '../../../components/layout';
import { StaticQuery, graphql } from 'gatsby';

const IndexPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
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
      render={(data) => (
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <h3>
                {node.frontmatter.title}{" "}
                <span>
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    />
  </Layout>
)

export default IndexPage
