import * as React from 'react';
import * as PropTypes from 'prop-types';
import prism from 'prismjs';
import 'prismjs/components/prism-jsx';

export class SourceCode extends React.PureComponent {
  render() {
    const { themeName, sectionName, demoName } = this.props;
    const { embeddedDemoOptions } = this.context;
    const { demoSources } = embeddedDemoOptions;
    return (
      <pre className="highlight language-jsx">
        <code
          className="language-jsx"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: prism.highlight(
              demoSources[sectionName][demoName][themeName].source || '',
              prism.languages.jsx,
            ),
          }}
        />
      </pre>
    );
  }
}

SourceCode.propTypes = {
  sectionName: PropTypes.string.isRequired,
  demoName: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

SourceCode.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};
