import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  editor: {
    width: '100%',
    '&:first-child': {
      marginTop: 0,
    },
  },
};

const TextEditorBase = ({
  classes,
  value,
  label,
  className,
  readOnly,
  onValueChange,
  ...restProps
}) => (
  <TextField
    label={label}
    className={classNames(classes.editor, className)}
    value={value}
    margin="normal"
    variant="filled"
    disabled={readOnly}
    onChange={({ target }) => onValueChange(target.value)}
    {...restProps}
  />
);

TextEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onValueChange: PropTypes.func,
};

TextEditorBase.defaultProps = {
  value: '',
  label: undefined,
  className: undefined,
  readOnly: false,
  onValueChange: () => undefined,
};

export const TextEditor = withStyles(styles)(TextEditorBase, { name: 'TextEditor' });
