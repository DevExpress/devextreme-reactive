import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  checkbox: {
    marginTop: '-5px',
    marginBottom: '-5px',
    marginRight: theme.spacing.unit,
    marginLeft: -theme.spacing.unit,
  },
});

export const SelectBase = ({
  disabled, selected, indeterminate, onToggle, classes,
  className, ...restProps
}) => (
  <Checkbox
    className={classNames(classes.checkbox, className)}
    checked={selected}
    indeterminate={indeterminate}
    disabled={disabled}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  />
);

SelectBase.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

SelectBase.defaultProps = {
  disabled: false,
  selected: false,
  indeterminate: false,
  onToggle: () => {},
  className: undefined,
};

export const Select = withStyles(styles)(SelectBase);
