import * as React from 'react';
import * as PropTypes from 'prop-types';
import MUISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import { STANDARD_SWITCHER } from '@devexpress/dx-scheduler-core';


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

const SelectBase = ({
  value,
  availableOptions,
  onChange,
  disabled,
  classes,
  id,
  ...restProps
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const Input = id === STANDARD_SWITCHER
    ? (
      <FilledInput />
    )
    : (
      <OutlinedInput
        classes={{ input: classes.input, root: classes.inputRoot }}
        labelWidth={0}
      />
    );

  const Icon = id === STANDARD_SWITCHER
    ? () => null : undefined;

  return (
    <MUISelect
      disabled={disabled}
      classes={{ root: classes.root }}
      value={value}
      onChange={handleChange}
      input={Input}
      IconComponent={Icon}
      hiddenLabel
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
};

SelectBase.propTypes = {
  onChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
  disabled: PropTypes.bool,
  id: PropTypes.string,
};

SelectBase.defaultProps = {
  disabled: false,
  onChange: () => undefined,
  availableOptions: [],
  id: STANDARD_SWITCHER,
};

export const Select = withStyles(styles)(SelectBase, { name: 'Select' });
