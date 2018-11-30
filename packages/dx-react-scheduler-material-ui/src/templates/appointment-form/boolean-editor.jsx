import * as React from 'react';
import * as PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const BooleanEditor = ({
  text,
  value,
  readOnly,
  onValueChange,
  ...restProps
}) => (
  <FormControlLabel
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

BooleanEditor.propTypes = {
  text: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};

BooleanEditor.defaultProps = {
  text: undefined,
  readOnly: false,
  value: false,
  onValueChange: () => undefined,
};
