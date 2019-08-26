import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  TITLE_TEXT_EDITOR,
  NOTES_TEXT_EDITOR,
  ORDINARY_TEXT_EDITOR,
  NUMBER_EDITOR,
} from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  editor: {
    width: '100%',
    marginTop: theme.spacing(0.375),
    marginBottom: theme.spacing(0.125),
  },
  title: {
    ...theme.typography.h6,
  },
});

const TextEditorBase = React.memo(({
  classes,
  value,
  placeholder,
  className,
  readOnly,
  onValueChange,
  id,
  ...restProps
}) => {
  const textFiledType = id === NUMBER_EDITOR ? 'number' : 'text';
  const notesTextEditor = id === NOTES_TEXT_EDITOR;
  return (
    <TextField
      className={classNames(classes.editor, className)}
      value={value}
      variant={notesTextEditor ? 'outlined' : 'filled'}
      disabled={readOnly}
      onChange={({ target }) => onValueChange(target.value)}
      InputProps={{
        className: classNames({
          [classes.title]: id === TITLE_TEXT_EDITOR,
        }),
      }}
      multiline={notesTextEditor}
      rows="5"
      type={textFiledType}
      hiddenLabel
      margin="normal"
      placeholder={placeholder}
      {...restProps}
    />
  );
});


TextEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onValueChange: PropTypes.func,
  id: PropTypes.string,
};

TextEditorBase.defaultProps = {
  value: '',
  placeholder: undefined,
  className: undefined,
  readOnly: false,
  onValueChange: () => undefined,
  id: ORDINARY_TEXT_EDITOR,
};

export const TextEditor = withStyles(styles)(TextEditorBase, { name: 'TextEditor' });
