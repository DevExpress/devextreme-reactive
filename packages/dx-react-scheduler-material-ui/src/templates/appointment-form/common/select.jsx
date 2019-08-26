import * as React from 'react';
import * as PropTypes from 'prop-types';
import MUISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
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

const SelectBase = React.memo(({
  value,
  availableOptions,
  onValueChange,
  readOnly,
  classes,
  id,
  ...restProps
}) => {
  const handleChange = (event) => {
    if (event.target.value === value) return;
    onValueChange(event.target.value);
  };

  const Input = id === STANDARD_SELECT
    ? <FilledInput hiddenLabel />
    : (
      <OutlinedInput
        classes={{ input: classes.input, root: classes.inputRoot }}
        labelWidth={0}
      />
    );

  return (
    <MUISelect
      readOnly={readOnly}
      classes={{ root: classes.root }}
      value={value}
      onChange={handleChange}
      input={Input}
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
    </MUISelect>
  );
});

SelectBase.propTypes = {
  onValueChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
  })),
  readOnly: PropTypes.bool,
  id: PropTypes.string,
};

SelectBase.defaultProps = {
  readOnly: false,
  onValueChange: () => undefined,
  availableOptions: [],
  id: STANDARD_SELECT,
};

export const Select = withStyles(styles)(SelectBase, { name: 'Select' });
