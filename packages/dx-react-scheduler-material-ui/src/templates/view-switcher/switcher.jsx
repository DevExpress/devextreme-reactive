import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ spacing, typography }) => ({
  root: {
    width: spacing.unit * 12.5,
    fontSize: typography.fontSize,
  },
  input: {
    padding: `${spacing.unit * 1.25}px ${spacing.unit * 1.75}px`,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  menuItem: {
    fontSize: typography.fontSize,
  },
});

const SwitcherBase = ({
  currentViewName,
  availableViewNames,
  onChange, classes,
  ...restProps
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Select
      classes={{ root: classes.root }}
      value={currentViewName}
      onChange={handleChange}
      input={(
        <OutlinedInput
          classes={{ input: classes.input }}
          className={classes.upperCase}
          labelWidth={0}
        />
      )}
      {...restProps}
    >
      {availableViewNames.map(viewName => (
        <MenuItem
          value={viewName}
          key={viewName}
          className={classNames(classes.upperCase, classes.menuItem)}
        >
          {viewName}
        </MenuItem>
      ))}
    </Select>
  );
};

SwitcherBase.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentViewName: PropTypes.string,
  availableViewNames: PropTypes.arrayOf(PropTypes.string),
};

SwitcherBase.defaultProps = {
  currentViewName: undefined,
  availableViewNames: [],
};

export const Switcher = withStyles(styles)(SwitcherBase, { name: 'Switcher' });
