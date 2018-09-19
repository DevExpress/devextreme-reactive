import React from 'react';
import { graphql, withPrefix } from 'gatsby';
import PageLayout from '../components/page-layout';

export default class extends React.Component {
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
    } catch(e) {};
    document.getElementsByTagName('head')[0].removeChild(this.demosScript)
  }

  render() {
    const { data: { markdownRemark }, location } = this.props;
    const content = markdownRemark.html
      .replace(
        /<table>/g,
        '<table class="table table-bordered table-striped">'
      )
      .replace(
        /href="([^"]*)"/g,
        (match, p1) => {
          if (p1.startsWith('http')) {
            return `href="${p1}"`;
          }
          return `href="../${p1.replace('.md', '')}/"`;
        }
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
          </div>`
        });

    return (
      <PageLayout
        technologyName={markdownRemark.fields.technology}
        sectionName={markdownRemark.fields.section}
        location={location}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </PageLayout>
    )
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
`
