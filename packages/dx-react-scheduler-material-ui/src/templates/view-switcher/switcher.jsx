import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ spacing, typography }) => ({
  root: {
    fontSize: typography.fontSize,
  },
  input: {
    padding: `${spacing.unit * 1.25}px ${spacing.unit * 1.75}px`,
    paddingRight: `${spacing.unit * 4}px`,
    textTransform: 'uppercase',
  },
  menuItem: {
    fontSize: typography.fontSize,
    textTransform: 'uppercase',
  },
});

const SwitcherBase = ({
  currentView,
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
      value={currentView.name}
      onChange={handleChange}
      input={(
        <OutlinedInput
          classes={{ input: classes.input }}
          labelWidth={0}
        />
      )}
      {...restProps}
    >
      {availableViewNames.map(view => (
        <MenuItem
          value={view.name}
          key={view.name}
          className={classes.menuItem}
        >
          {view.displayName}
        </MenuItem>
      ))}
    </Select>
  );
};

SwitcherBase.propTypes = {
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  currentViewName: PropTypes.string,
  availableViewNames: PropTypes.arrayOf(PropTypes.string),
};

SwitcherBase.defaultProps = {
  currentViewName: undefined,
  availableViewNames: [],
};

export const Switcher = withStyles(styles)(SwitcherBase, { name: 'Switcher' });
