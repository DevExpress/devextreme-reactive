import * as React from 'react';
import { styled, Checkbox, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

const PREFIX = 'BooleanEditor';

const classes = {
  label: `${PREFIX}-label`,
};

const StyledFormControlLabel = styled(FormControlLabel)({
  [`&.${classes.label}`]: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    userSelect: 'none',
  },
});

export const BooleanEditor = React.memo(({
  label,
  value,
  readOnly,
  onValueChange,
  ...restProps
}) => (
  <StyledFormControlLabel
    classes={{ label: classes.label }}
    control={(
      <Checkbox
        color="primary"
        checked={value}
        onChange={({ target }) => onValueChange(target.checked)}
      />
    )}
    disabled={readOnly}
    label={label}
    {...restProps}
  />
));

BooleanEditor.propTypes = {
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
};

BooleanEditor.defaultProps = {
  label: undefined,
  readOnly: false,
  value: false,
};
