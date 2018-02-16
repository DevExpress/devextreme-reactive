import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckboxMUI from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  checkbox: {
    marginTop: -theme.spacing.unit,
    marginBottom: -theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    marginLeft: -theme.spacing.unit * 2,
  },
});

export const TableTreeCheckboxBase = ({
  disabled, selected, someSelected, onToggle, classes,
  className, ...restProps
}) => (
  <CheckboxMUI
    className={classNames(classes.checkbox, className)}
    checked={selected}
    indeterminate={someSelected}
    disabled={disabled}
    onClick={(e) => {
      if (disabled) return;
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  />
);

TableTreeCheckboxBase.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  someSelected: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TableTreeCheckboxBase.defaultProps = {
  disabled: false,
  selected: false,
  someSelected: false,
  onToggle: () => {},
  className: undefined,
};

export const TableTreeCheckbox = withStyles(styles)(TableTreeCheckboxBase);
