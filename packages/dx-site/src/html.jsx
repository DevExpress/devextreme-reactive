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
          <link rel="preconnect" href="https://matomo.devexpress.com" />
          <link rel="dns-prefetch" href="https://matomo.devexpress.com" />
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js" />

          { /* Matomo Tag Manager */ }
          <script>
            {`
              var _mtm = window._mtm = window._mtm || [];
              _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
              var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
              g.async = true; g.src = 'https://matomo.devexpress.com/js/container_foTT0fJ8.js'; g.setAttributeNode(d.createAttribute('data-ot-ignore')); s.parentNode.insertBefore(g, s);
            `}
          </script>
          { /* End Matomo Tag Manager */ }
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
