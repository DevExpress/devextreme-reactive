import * as React from 'react';
import * as PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends React.Component {
  static get propTypes() {
    return {
      headComponents: PropTypes.node,
      postBodyComponents: PropTypes.node,
      body: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      headComponents: undefined,
      postBodyComponents: undefined,
      body: undefined,
    };
  }

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
