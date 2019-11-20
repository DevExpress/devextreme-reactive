/* global document:true window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { graphql, withPrefix } from 'gatsby';
import Helmet from 'react-helmet';
import PageLayout from '../components/layouts/docs-page-layout';

const getNpmTag = () => {
  const versionTag = process.env.VERSION_TAG;
  return versionTag && versionTag !== 'latest' ? `@${versionTag}` : '';
};

export default class extends React.Component {
  static get propTypes() {
    return {
      data: PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.demosScriptLink = withPrefix(`/static/${props.data.markdownRemark.fields.technology.replace('/', '-')}-demos.js`);
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

  render() {
    const { data: { markdownRemark } } = this.props;
    const content = markdownRemark.html
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
            scriptPath: this.demosScriptLink,
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
        /\.npm\-tag\(\)/g,
        getNpmTag(),
      );

    const title = content.split('</h1>')[0].split('</a>')[1];

    return (
      <PageLayout
        technologyName={markdownRemark.fields.technology}
        sectionName={markdownRemark.fields.section}
      >
        <Helmet title={title} />
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </PageLayout>
    );
  }
}

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
