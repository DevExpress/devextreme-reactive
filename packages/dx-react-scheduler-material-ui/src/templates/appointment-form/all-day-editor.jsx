import * as React from 'react';
import * as PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const AllDayEditor = ({
  text,
  checked,
  readOnly,
  ...restProps
}) => (
  <FormControlLabel
    control={(
      <Checkbox
        color="primary"
        disabled={readOnly}
        checked={checked}
      />
    )}
    label={text}
    {...restProps}
  />
);

AllDayEditor.propTypes = {
  text: PropTypes.string,
  readOnly: PropTypes.bool,
  checked: PropTypes.bool,
};

AllDayEditor.defaultProps = {
  text: undefined,
  readOnly: false,
  checked: false,
};
