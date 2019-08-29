import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { STANDARD_SELECT } from '@devexpress/dx-scheduler-core';


const styles = ({ typography, spacing }) => ({
  filledSelect: {
    marginTop: spacing(0.375),
    marginBottom: spacing(0.125),
  },
  menuItem: {
    fontSize: typography.fontSize,
    textTransform: 'uppercase',
  },
});

const FilledSelectBase = React.memo(({
  value,
  availableOptions,
  onValueChange,
  readOnly,
  classes,
  type,
  className,
  ...restProps
}) => {
  const handleChange = (event) => {
    if (event.target.value === value) return;
    onValueChange(event.target.value);
  };

  return (
    <TextField
      select
      className={classNames(classes.filledSelect, className)}
      value={value}
      onChange={handleChange}
      margin="normal"
      variant="filled"
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
    </TextField>
  );
});

FilledSelectBase.propTypes = {
  onValueChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
  })),
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

FilledSelectBase.defaultProps = {
  readOnly: false,
  onValueChange: () => undefined,
  availableOptions: [],
  type: STANDARD_SELECT,
};

export const FilledSelect = withStyles(styles)(FilledSelectBase, { name: 'FilledSelect' });
