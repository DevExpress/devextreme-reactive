import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ spacing }) => ({
  root: {
    height: spacing.unit * 5,
    width: spacing.unit * 12.5,
  },
  input: {
    padding: `${spacing.unit * 1.25}px ${spacing.unit * 1.75}px`,
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
      input={(<OutlinedInput classes={{ input: classes.input }} labelWidth={0} />)}
      {...restProps}
    >
      {availableViewNames.map(viewName => (
        <MenuItem value={viewName} key={viewName}>
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
