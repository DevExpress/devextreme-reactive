import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import CheckboxMUI from '@mui/material/Checkbox';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  checkbox: {
    marginTop: '-1px',
    marginBottom: '-1px',
    marginRight: theme.spacing(2),
    marginLeft: -theme.spacing(2),
    padding: theme.spacing(1),
  },
});

export const TableTreeCheckboxBase = ({
  disabled, checked, indeterminate, onChange, classes, className, ...restProps
}) => (
  <CheckboxMUI
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

TableTreeCheckboxBase.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TableTreeCheckboxBase.defaultProps = {
  disabled: false,
  checked: false,
  indeterminate: false,
  onChange: () => {},
  className: undefined,
};

export const TableTreeCheckbox = withStyles(styles)(TableTreeCheckboxBase);
