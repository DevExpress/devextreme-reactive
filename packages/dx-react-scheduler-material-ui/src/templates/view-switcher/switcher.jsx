import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const Switcher = ({
  currentViewName,
  availableViewNames,
  onChange,
  ...restProps
}) => {
  const handleChange = (event) => {
    onChange({ nextViewName: event.target.value });
  };

  return (
    <Select
      disableUnderline
      value={currentViewName}
      onChange={handleChange}
      {...restProps}
    >
      {availableViewNames.map(view => (
        <MenuItem value={view} key={view}>
          {view}
        </MenuItem>
      ))}
    </Select>
  );
};

Switcher.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentViewName: PropTypes.string,
  availableViewNames: PropTypes.array,
};

Switcher.defaultProps = {
  currentViewName: undefined,
  availableViewNames: [],
};
