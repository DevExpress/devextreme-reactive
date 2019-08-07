import * as React from 'react';
import * as PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ typography }) => ({
  label: {
    fontSize: typography.fontSize + 1,
  },
});

const BooleanEditorBase = ({
  text,
  value,
  readOnly,
  onValueChange,
  classes,
  ...restProps
}) => (
  <FormControlLabel
    classes={{ label: classes.label }}
    control={(
      <Checkbox
        color="primary"
        checked={value}
        onChange={({ target }) => onValueChange(target.checked)}
      />
    )}
    disabled={readOnly}
    label={text}
    {...restProps}
  />
);

BooleanEditorBase.propTypes = {
  text: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

BooleanEditorBase.defaultProps = {
  text: undefined,
  readOnly: false,
  value: false,
  onValueChange: () => undefined,
};

export const BooleanEditor = withStyles(styles)(BooleanEditorBase, { name: 'BooleanEditor' });
