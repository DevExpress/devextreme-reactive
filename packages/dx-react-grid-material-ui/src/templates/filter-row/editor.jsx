import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';

const PREFIX = 'Editor';
export const classes = {
  input: `${PREFIX}-input`,
  root: `${PREFIX}-root`,
};

const StyledInput = styled(Input)(({ theme }) => ({
  [`& .${classes.input}`]: {
    width: '100%',
    fontSize: '14px',
  },
  [`&.${classes.root}`]: {
    margin: theme.spacing(1),
  },
}));

export const Editor = ({
  value, disabled, getMessage, onChange,
  ...restProps
}) => (
  <StyledInput
    classes={{
      input: classes.input,
      root: classes.root,
    }}
    fullWidth
    disabled={disabled}
    value={value}
    onChange={event => onChange(event.target.value)}
    placeholder={getMessage('filterPlaceholder')}
    {...restProps}
  />
);

Editor.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  getMessage: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  value: '',
  disabled: false,
  onChange: () => {},
};
