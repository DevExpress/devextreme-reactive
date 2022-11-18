import * as React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends React.Component {
  static propTypes = {
    headComponents: PropTypes.node,
    postBodyComponents: PropTypes.node,
    body: PropTypes.string,
  };

  static defaultProps = {
    headComponents: undefined,
    postBodyComponents: undefined,
    body: undefined,
  };

  render() {
    const { headComponents, postBodyComponents, body } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {headComponents}
          <link href="/img/favicon.ico" rel="icon" type="image/x-icon" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.42.0/codemirror.min.css" type="text/css" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.42.0/addon/fold/foldgutter.min.css" type="text/css" rel="stylesheet" />
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js" />
        </head>
        <body>
          <div
            id="___gatsby"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {postBodyComponents}
        </body>
      </html>
    );
  }
}
