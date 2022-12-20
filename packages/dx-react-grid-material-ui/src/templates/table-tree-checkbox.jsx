import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { Checkbox as CheckboxMUI, styled } from '@mui/material';

const PREFIX = 'TableTreeCheckbox';
export const classes = {
  checkbox: `${PREFIX}-checkbox`,
};

const StyledCheckboxMUI = styled(CheckboxMUI)(({ theme }) => ({
  [`&.${classes.checkbox}`]: {
    marginTop: '-1px',
    marginBottom: '-1px',
    marginRight: theme.spacing(2),
    marginLeft: -theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

export const TableTreeCheckbox = ({
  disabled, checked, indeterminate, onChange, className, ...restProps
}) => (
  <StyledCheckboxMUI
    className={classNames(classes.checkbox, className)}
    checked={checked}
    indeterminate={indeterminate}
    disabled={disabled}
    onClick={(e) => {
      if (disabled) return;
      e.stopPropagation();
      onChange();
    }}
    {...restProps}
  />
);

TableTreeCheckbox.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

TableTreeCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  indeterminate: false,
  onChange: () => {},
  className: undefined,
};
