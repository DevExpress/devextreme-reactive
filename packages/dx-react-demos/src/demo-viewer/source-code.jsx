import React from 'react';
import PropTypes from 'prop-types';
import prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import { demos } from '../demo-registry';

export class SourceCode extends React.PureComponent {
  render() {
    const { theme, section, demo } = this.props;
    return (
      <pre className="highlight language-jsx">
        <code
          className="language-jsx"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: prism.highlight(
              demos[section][demo][theme].source,
              prism.languages.jsx,
            ),
          }}
        />
      </pre>
    );
  }
}

SourceCode.propTypes = {
  section: PropTypes.string.isRequired,
  demo: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};
