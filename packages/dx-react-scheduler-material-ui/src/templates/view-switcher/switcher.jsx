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
    padding: `${spacing(1.25)}px ${spacing(1.75)}px`,
    paddingRight: `${spacing(4)}px`,
    textTransform: 'uppercase',
  },
  menuItem: {
    fontSize: typography.fontSize,
    textTransform: 'uppercase',
  },
  inputRoot: {
    marginLeft: `${spacing(0.5)}px`,
    '&:first-child': {
      marginLeft: 0,
    },
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
          classes={{ input: classes.input, root: classes.inputRoot }}
          labelWidth={0}
        />
      )}
      {...restProps}
    >
      {availableViewNames.map(viewName => (
        <MenuItem
          value={viewName}
          key={viewName}
          className={classes.menuItem}
        >
          {viewName}
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
