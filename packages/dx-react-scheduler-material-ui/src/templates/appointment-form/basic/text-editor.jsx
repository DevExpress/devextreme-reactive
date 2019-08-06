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
  },
  title: {
    ...theme.typography.h6,
    height: '2.75em',
    background: theme.palette.background.paper,
  },
  textField: {
    height: '3.5em',
    background: theme.palette.background.paper,
  },
});

const TextEditorBase = ({
  classes,
  value,
  label,
  className,
  readOnly,
  onValueChange,
  id,
  style,
  ...restProps
}) => {
  const textFiledType = id === NUMBER_EDITOR ? 'number' : 'text';
  return (
    <TextField
      label={label}
      className={classNames(classes.editor, className)}
      value={value}
      margin="normal"
      variant={id === NOTES_TEXT_EDITOR ? 'outlined' : 'filled'}
      disabled={readOnly}
      onChange={({ target }) => onValueChange(target.value)}
      InputProps={{
        className: classNames({
          [classes.textField]: id === ORDINARY_TEXT_EDITOR || id === NUMBER_EDITOR,
          [classes.title]: id === TITLE_TEXT_EDITOR,
        }),
      }}
      multiline={id === NOTES_TEXT_EDITOR}
      rows="4"
      type={textFiledType}

      {...restProps}
    />
  );
}


TextEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
  id: PropTypes.string,
};

TextEditorBase.defaultProps = {
  value: '',
  label: undefined,
  className: undefined,
  readOnly: false,
  onValueChange: () => undefined,
  style: null,
  id: ORDINARY_TEXT_EDITOR,
};

export const TextEditor = withStyles(styles)(TextEditorBase, { name: 'TextEditor' });
