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

const EditorBase = ({
  classes,
  value,
  label,
  className,
  type,
  readOnly,
  ...restProps
}) => (
  <TextField
    id="standard-name"
    label={label}
    className={classNames(classes.editor, className)}
    value={value}
    margin="normal"
    variant="filled"
    type={type && type}
    disabled={readOnly}
    {...restProps}
  />
);

EditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

EditorBase.defaultProps = {
  value: '',
  label: undefined,
  className: undefined,
  readOnly: false,
  type: undefined,
};

export const Editor = withStyles(styles)(EditorBase);
