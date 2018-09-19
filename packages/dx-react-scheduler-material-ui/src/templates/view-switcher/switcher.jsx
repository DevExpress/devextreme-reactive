import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const Switcher = ({
  currentViewName,
  availableViews,
  onItemClick,
  ...restProps
}) => {
  const clickHandle = (event) => {
    onItemClick({ nextViewName: event.target.value });
  };

  return (
    <Select
      disableUnderline
      value={currentViewName}
      onChange={clickHandle}
      {...restProps}
    >
      {availableViews.map(view => (
        <MenuItem value={view} key={view}>
          {view}
        </MenuItem>
      ))}
    </Select>
  );
};

Switcher.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  currentViewName: PropTypes.string,
  availableViews: PropTypes.array,
};

Switcher.defaultProps = {
  currentViewName: undefined,
  availableViews: [],
};
