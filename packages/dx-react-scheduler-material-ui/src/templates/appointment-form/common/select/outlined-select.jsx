import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import { STANDARD_SELECT } from '@devexpress/dx-scheduler-core';


const styles = ({ typography }) => ({
  root: {
    fontSize: typography.fontSize,
  },
  input: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: typography.fontSize,
  },
  menuItem: {
    fontSize: typography.fontSize,
    textTransform: 'uppercase',
  },
  inputRoot: {
    width: '100%',
  },
});

const OutlinedSelectBase = React.memo(({
  value,
  availableOptions,
  onValueChange,
  readOnly,
  classes,
  ...restProps
}) => {
  const handleChange = (event) => {
    if (event.target.value === value) return;
    onValueChange(event.target.value);
  };

  return (
    <Select
      disabled={readOnly}
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

});

OutlinedSelectBase.propTypes = {
  onValueChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
  })),
  readOnly: PropTypes.bool,
};

OutlinedSelectBase.defaultProps = {
  readOnly: false,
  onValueChange: () => undefined,
  availableOptions: [],
};

export const OutlinedSelect = withStyles(styles)(OutlinedSelectBase, { name: 'OutlinedSelect' });
