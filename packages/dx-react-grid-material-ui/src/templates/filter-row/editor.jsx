import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

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
    onChange={event => onChange(event.target.value)}
    placeholder={getMessage('filterPlaceholder')}
    {...restProps}
  />
);

EditorBase.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  getMessage: PropTypes.func.isRequired,
};

EditorBase.defaultProps = {
  value: '',
  disabled: false,
  onChange: () => {},
};

export const Editor = withStyles(styles, { name: 'Editor' })(EditorBase);
