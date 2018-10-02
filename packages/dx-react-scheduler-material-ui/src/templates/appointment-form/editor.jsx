import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  editor: {
    width: '100%',
  },
});

const EditorBase = ({
  classes,
  value,
  placeholder,
  changeHandler,
  className,
  label,
  defaultValue,
  type,
  readOnly,
}) => {
  return (
    <TextField
      id="standard-name"
      label={placeholder}
      className={classNames(classes.editor, className)}
      value={value}
      defaultValue={defaultValue}
      // onChange={this.handleChange('name')}
      margin="normal"
      variant="filled"
      type={type && type}
      disabled={readOnly}
    />
  );
};

export const Editor = withStyles(styles)(EditorBase);
