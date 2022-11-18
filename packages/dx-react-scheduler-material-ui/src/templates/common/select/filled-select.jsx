import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'clsx';
import TextField from '@mui/material/TextField';

const PREFIX = 'FilledSelect';

export const classes = {
  filledSelect: `${PREFIX}-filledSelect`,
  menuItem: `${PREFIX}-menuItem`,
};

const StyledTextField = styled(TextField)(({
  theme: { typography, spacing },
}) => ({
  [`&.${classes.filledSelect}`]: {
    marginTop: spacing(0.375),
    marginBottom: spacing(0.125),
  },
  [`& .${classes.menuItem}`]: {
    fontSize: typography.fontSize,
    textTransform: 'uppercase',
  },
}));

export const FilledSelect = React.memo(({
  value,
  availableOptions,
  onValueChange,
  readOnly,
  className,
  ...restProps
}) => {
  const handleChange = (event) => {
    if (event.target.value !== value) onValueChange(event.target.value);
  };

  return (
    <StyledTextField
      select
      className={classNames(classes.filledSelect, className)}
      value={value}
      onChange={handleChange}
      margin="normal"
      hiddenLabel
      disabled={readOnly}
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
    </StyledTextField>
  );
});

FilledSelect.propTypes = {
  onValueChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
  })),
  readOnly: PropTypes.bool,
  className: PropTypes.string,
};

FilledSelect.defaultProps = {
  readOnly: false,
  onValueChange: () => undefined,
  availableOptions: [],
  className: undefined,
};
