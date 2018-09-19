import React from 'react';
import { graphql, withPrefix } from 'gatsby';
import Layout from '../components/layout';

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
    const { data: { markdownRemark } } = this.props;
    let content = markdownRemark.html;
    content = content
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
      <Layout>
        <div>
          <h1>{markdownRemark.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        technology
      }
      frontmatter {
        title
      }
    }
  }
`
