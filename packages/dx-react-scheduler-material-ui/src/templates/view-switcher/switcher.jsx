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
    padding: spacing(1.25, 1.75),
    paddingRight: spacing(4),
    textTransform: 'uppercase',
  },
  menuItem: {
    fontSize: typography.fontSize,
    textTransform: 'uppercase',
  },
  inputRoot: {
    marginLeft: spacing(0.5),
    '&:first-child': {
      marginLeft: 0,
    },
  },
});

const SwitcherBase = ({
  currentView,
  availableViews,
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
          classes={{ input: classes.input, root: classes.inputRoot }}
          labelWidth={0}
        />
      )}
      {...restProps}
    >
      {availableViews.map(({ name, displayName }) => (
        <MenuItem
          value={name}
          key={name}
          className={classes.menuItem}
        >
          {displayName}
        </MenuItem>
      ))}
    </Select>
  );
};

SwitcherBase.propTypes = {
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  currentView: PropTypes.shape({
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  availableViews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })),
};

SwitcherBase.defaultProps = {
  availableViews: [],
};

export const Switcher = withStyles(styles)(SwitcherBase, { name: 'Switcher' });
