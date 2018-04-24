import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

const styles = {
  input: {
    width: '100%',
  },
};

const EditorBase = ({
  value, disabled, getMessage, onChange, classes,
  ...restProps
}) => (
  <Input
    classes={{
      input: classes.input,
    }}
    fullWidth
    disabled={disabled}
    value={value}
    onChange={onChange}
    placeholder={getMessage('filterPlaceholder')}
    {...restProps}
  />
);

EditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  getMessage: PropTypes.func,
};

EditorBase.defaultProps = {
  value: '',
  disabled: false,
  onChange: () => {},
  getMessage: PropTypes.func.isRequired,
};

export const Editor = withStyles(styles)(EditorBase);
