/* global document:true window:true */

import * as React from 'react';
import PropTypes from 'prop-types';
import { graphql, withPrefix } from 'gatsby';
import Helmet from 'react-helmet';
import PageLayout from '../components/layouts/docs-page-layout';

const getNpmTag = () => {
  const versionTag = process.env.VERSION_TAG;
  return versionTag && versionTag !== 'latest' ? `@${versionTag}` : '';
};

class Page extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.shape({
        fields: PropTypes.shape({
          technology: PropTypes.string.isRequired,
          section: PropTypes.string.isRequired,
        }),
        html: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const { data: { markdownRemark: { fields: { technology } } } } = props;

    this.demosScriptLink = withPrefix(`/static/${technology.replace('/', '-')}-demos.js`);
  }

  componentDidMount() {
    this.demosScript = document.createElement('script');
    this.demosScript.src = this.demosScriptLink;
    document.getElementsByTagName('head')[0].appendChild(this.demosScript);
  }

  componentWillUnmount() {
    try {
      window.deinitializeDemos();
    } catch (e) { /**/ }
    document.getElementsByTagName('head')[0].removeChild(this.demosScript);
  }

  getScriptPath({ product }) {
    return product
      ? withPrefix(`/static/react-${product}-demos.js`)
      : this.demosScriptLink;
  }

  render() {
    const { data: { markdownRemark: { html, fields: { technology, section } } } } = this.props;
    const content = html
      .replace(
        /<table>/g,
        '<table class="table table-bordered table-striped">',
      )
      .replace(
        /href="([^"]*)"/g,
        (match, p1) => {
          if (p1.startsWith('http') || p1.startsWith('#')) {
            return `href="${p1}"`;
          }
          const endChar = p1.includes('#') ? '' : '/';
          return `href="../${p1.replace('.md', '')}${endChar}"`;
        },
      )
      .replace(
        /\.embedded-demo\(([^()]*)\)/g,
        (match, p1) => {
          const data = JSON.parse(p1);
          const options = {
            ...data,
            path: `/demo/${data.path}`,
            scriptPath: this.getScriptPath(data),
          };
          return `<div
            class="embedded-demo"
            data-options='${JSON.stringify(options)}'
          >
            <div class="loading-shading">
              <span class="glyphicon glyphicon-refresh loading-icon"></span>
            </div>
          </div>`;
        },
      )
      .replace(
        /\.npm-tag\(\)/g,
        getNpmTag(),
      );

    const title = content.split('</h1>')[0].split('</a>')[1];

    return (
      <PageLayout
        technologyName={technology}
        sectionName={section}
      >
        <Helmet title={title} />
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </PageLayout>
    );
  }
}

export default Page;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        technology
        section
      }
      frontmatter {
        title
      }
    }
  }
`;
