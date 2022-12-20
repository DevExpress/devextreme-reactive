import * as React from 'react';
import {
  styled, Select, MenuItem, OutlinedInput,
} from '@mui/material';
import PropTypes from 'prop-types';

const PREFIX = 'OutlinedSelect';

const classes = {
  root: `${PREFIX}-root`,
  input: `${PREFIX}-input`,
  menuItem: `${PREFIX}-menuItem`,
  inputRoot: `${PREFIX}-inputRoot`,
};

const StyledSelect = styled(Select)(({ theme: { typography } }) => ({
  [`&.${classes.root}`]: {
    fontSize: typography.fontSize + 2,
  },
}));

const StyledOutlinedInput = styled(OutlinedInput)(() => ({
  [`& .${classes.input}`]: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  [`&.${classes.inputRoot}`]: {
    width: '100%',
  },
}));

export const OutlinedSelect = React.memo(({
  value,
  availableOptions,
  onValueChange,
  readOnly,
  inputClasses,
  ...restProps
}) => {
  const handleChange = (event) => {
    if (event.target.value !== value) onValueChange(event.target.value);
  };

  return (
    <StyledSelect
      disabled={readOnly}
      classes={{ root: classes.root }}
      value={value}
      onChange={handleChange}
      input={(
        <StyledOutlinedInput
          classes={inputClasses || { input: classes.input, root: classes.inputRoot }}
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
    </StyledSelect>
  );
});

OutlinedSelect.propTypes = {
  onValueChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
  })),
  readOnly: PropTypes.bool,
  inputClasses: PropTypes.object,
};

OutlinedSelect.defaultProps = {
  readOnly: false,
  onValueChange: () => undefined,
  availableOptions: [],
  inputClasses: null,
};
