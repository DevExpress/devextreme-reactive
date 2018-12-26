import * as React from 'react';
import * as PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { EmbeddedDemoContext } from '../context';
import { findOccurrence } from '../utils';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/search/searchcursor';

const FOLD_BLOCK = '// #FOLD_BLOCK';
const IMPORTANT_LINE = '// #IMPORTANT_LINE';
const CONSTRUCTOR = 'constructor';
const CONST = 'const ';
const IMPORT = 'import ';

export class SourceCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.foldBlockStartLines = [];
    this.importantLines = [];
  }

  componentDidMount() {
    this.codeMirror = CodeMirror.fromTextArea(this.textarea.current, {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      mode: 'jsx',
      foldGutter: true,
      viewportMargin: Infinity,
      height: 'auto',
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    });
    this.applySpecialOptions();
  }

  componentWillReceiveProps(nextProps) {
    const sourceCode = this.prepareSourceCode(nextProps);
    this.codeMirror.setValue(sourceCode);
    this.applySpecialOptions();
  }

  prepareSourceCode(props) {
    this.foldBlockStartLines = [];
    this.importantLines = [];
    const { themeName, sectionName, demoName } = props;
    const { demoSources } = this.context;
    const source = demoSources[sectionName][demoName][themeName].source || '';
    let occurrenceIndex = 0;

    return source.split('\n')
      .filter((line, index) => {
        if (line.indexOf(FOLD_BLOCK) > -1) {
          this.foldBlockStartLines.push(index - occurrenceIndex);
          occurrenceIndex += 1;
          return false;
        } if (findOccurrence(line, [CONSTRUCTOR, CONST, IMPORT])) {
          this.foldBlockStartLines.push(index);
        } return true;
      }).map((line, index) => {
        if (line.indexOf(IMPORTANT_LINE) > -1) {
          this.importantLines.push(index);
        }
        return line.replace(IMPORTANT_LINE, '');
      }).join('\n');
  }

  applySpecialOptions() {
    this.foldBlockStartLines.forEach((lineNumber) => {
      this.codeMirror.foldCode(CodeMirror.Pos(lineNumber, 0));
    });
    this.importantLines.forEach((lineNumber) => {
      this.codeMirror.addLineClass(lineNumber, 'background', 'CodeMirror-important-line');
    });
  }

  render() {
    const sourceCode = this.prepareSourceCode(this.props);
    return (
      <textarea
        ref={this.textarea}
        defaultValue={sourceCode}
        onChange={() => {}}
      />
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
SourceCode.propTypes = {
  sectionName: PropTypes.string.isRequired,
  demoName: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

SourceCode.contextType = EmbeddedDemoContext;
