import * as React from 'react';
import * as PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';

export class SourceCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textarea = null;
  }

  componentDidMount() {
    CodeMirror.fromTextArea(this.textarea, {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      mode: 'javascript',
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    });
  }

  render() {
    const { themeName, sectionName, demoName } = this.props;
    const { embeddedDemoOptions } = this.context;
    const { demoSources } = embeddedDemoOptions;
    return (
      <textarea
        ref={(ref) => { this.textarea = ref; }}
        value={demoSources[sectionName][demoName][themeName].source || ''}
        onChange={() => {}}
      />
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
