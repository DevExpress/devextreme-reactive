import * as React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { EmbeddedDemoContext } from '../context';
import { isOccurrenceInSource } from '../utils';
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
    this.updateCodeMirror();
    const { getEditorInstance } = this.props;
    getEditorInstance(this.codeMirror);
  }

  componentDidUpdate() {
    this.updateCodeMirror();
  }

  updateCodeMirror() {
    const { source, foldBlockStartLines, importantLines } = this.prepareSourceCode();
    this.codeMirror.setValue(source);
    this.applySpecialCodeOptions(foldBlockStartLines, importantLines);
  }

  prepareSourceCode() {
    const { source } = this.props;
    const foldBlockStartLines = [];
    const importantLines = [];
    let occurrenceIndex = 0;

    const nextSource = source.split('\n')
      .filter((line, index) => {
        if (line.indexOf(FOLD_BLOCK) > -1) {
          foldBlockStartLines.push(index - occurrenceIndex);
          occurrenceIndex += 1;
          return false;
        } if (isOccurrenceInSource(line, [CONSTRUCTOR, CONST, IMPORT])) {
          foldBlockStartLines.push(index);
        } return true;
      }).map((line, index) => {
        if (line.indexOf(IMPORTANT_LINE) > -1) {
          importantLines.push(index);
        }
        return line.replace(IMPORTANT_LINE, '');
      }).join('\n');

    return ({
      source: nextSource,
      foldBlockStartLines,
      importantLines,
    });
  }

  applySpecialCodeOptions(foldBlockStartLines, importantLines) {
    foldBlockStartLines.forEach((lineNumber) => {
      this.codeMirror.foldCode(CodeMirror.Pos(lineNumber, 0));
    });
    importantLines.forEach((lineNumber) => {
      this.codeMirror.addLineClass(lineNumber, 'background', 'CodeMirror-important-line');
    });
  }

  render() {
    return (
      <textarea
        ref={this.textarea}
        defaultValue=""
      />
    );
  }
}

SourceCode.propTypes = {
  source: PropTypes.string.isRequired,
  getEditorInstance: PropTypes.func.isRequired,
};

SourceCode.contextType = EmbeddedDemoContext;
