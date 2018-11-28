import * as React from 'react';
import * as PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/search/searchcursor';

export class SourceCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textarea = null;
    this.source = '';
    this.foldBlockStartLines = [];
  }

  componentDidMount() {
    const editor = CodeMirror.fromTextArea(this.textarea, {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      mode: 'jsx',
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    });
    this.foldBlockStartLines.forEach((lineNumber) => {
      editor.foldCode(CodeMirror.Pos(lineNumber, 0));
    });
  }

  render() {
    const { themeName, sectionName, demoName } = this.props;
    const { embeddedDemoOptions } = this.context;
    const { demoSources } = embeddedDemoOptions;
    this.source = demoSources[sectionName][demoName][themeName].source || '';
    let occurrenceIndex = 0;
    const sourceLines = this.source.split('\n').filter((line, index) => {
      if (line.indexOf('// #foldBlock') > -1) {
        this.foldBlockStartLines.push(index - occurrenceIndex);
        occurrenceIndex += 1;
        return false;
      }
      return true;
    });

    return (
      <textarea
        ref={(ref) => { this.textarea = ref; }}
        value={sourceLines.join('\n')}
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
