import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';
import {
  TITLE_TEXT_EDITOR,
  MULTILINE_TEXT_EDITOR,
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
  type,
  ...restProps
}) => {
  const textFieldType = type === NUMBER_EDITOR ? 'number' : 'text';
  const notesTextEditor = type === MULTILINE_TEXT_EDITOR;
  return (
    <TextField
      className={classNames(classes.editor, className)}
      value={value}
      variant={notesTextEditor ? 'outlined' : 'filled'}
      disabled={readOnly}
      onChange={({ target }) => onValueChange(target.value)}
      InputProps={{
        className: classNames({
          [classes.title]: type === TITLE_TEXT_EDITOR,
        }),
      }}
      multiline={notesTextEditor}
      rows="5"
      type={textFieldType}
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
  type: PropTypes.string,
};

TextEditorBase.defaultProps = {
  value: '',
  placeholder: undefined,
  className: undefined,
  readOnly: false,
  onValueChange: () => undefined,
  type: ORDINARY_TEXT_EDITOR,
};

export const TextEditor = withStyles(styles)(TextEditorBase, { name: 'TextEditor' });
