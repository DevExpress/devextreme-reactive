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

const DateEditorBase = ({
  classes,
  value,
  label,
  className,
  type,
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
    type="datetime-local"
    disabled={readOnly}
    InputLabelProps={{
      shrink: true,
    }}
    {...restProps}
  />
);

DateEditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  appointment: PropTypes.object,
};

DateEditorBase.defaultProps = {
  value: '',
  label: undefined,
  className: undefined,
  readOnly: false,
  type: undefined,
  appointment: undefined,
};

export const DateEditor = withStyles(styles)(DateEditorBase);
