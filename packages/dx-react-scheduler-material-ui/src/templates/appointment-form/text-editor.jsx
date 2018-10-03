import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  editor: {
    width: '100%',
  },
});

const TextEditorBase = ({
  classes,
  value,
  label,
  className,
  readOnly,
  appointment,
  ...restProps
}) => (
  <TextField
    label={label}
    className={classNames(classes.editor, className)}
    value={value}
    margin="normal"
    variant="filled"
    disabled={readOnly}
    {...restProps}
  />
);

TextEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  appointment: PropTypes.object,
};

TextEditorBase.defaultProps = {
  value: '',
  label: undefined,
  className: undefined,
  readOnly: false,
  appointment: undefined,
};

export const TextEditor = withStyles(styles)(TextEditorBase, { name: 'TextEditor' });
