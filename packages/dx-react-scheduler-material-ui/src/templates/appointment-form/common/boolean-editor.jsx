import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const PREFIX = 'BooleanEditor';

const classes = {
  label: `${PREFIX}-label`,
};

const Root = styled(FormControlLabel)({
  [`& .${classes.label}`]: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    userSelect: 'none',
  },
});

const BooleanEditorBase = React.memo(({
  label,
  value,
  readOnly,
  onValueChange,
  ...restProps
}) => (
  <Root
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

BooleanEditorBase.propTypes = {
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

BooleanEditorBase.defaultProps = {
  label: undefined,
  readOnly: false,
  value: false,
};

export const BooleanEditor = (BooleanEditorBase);
