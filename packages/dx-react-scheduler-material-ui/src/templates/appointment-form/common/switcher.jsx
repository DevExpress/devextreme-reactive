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
    width: '100%',
    '&:first-child': {
      marginLeft: 0,
    },
    padding: spacing(2, 1),
  },
});

const SwitcherBase = ({
  value,
  availableOptions,
  onChange,
  classes,
  ...restProps
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Select
      classes={{ root: classes.root }}
      value={value}
      onChange={handleChange}
      input={(
        <OutlinedInput
          classes={{ input: classes.input, root: classes.inputRoot }}
          labelWidth={0}
        />
      )}
      {...restProps}
    >
      {availableOptions.map(option => (
        <MenuItem
          value={option.id}
          key={option.id}
          className={classes.menuItem}
        >
          {option.text}
        </MenuItem>
      ))}
    </Select>
  );
};

SwitcherBase.propTypes = {
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const Switcher = withStyles(styles)(SwitcherBase, { name: 'Switcher' });
