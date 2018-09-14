import * as React from 'react';
import * as PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const Switcher = ({
  currentView,
  availableViews,
  onItemClick,
  ...restProps
}) => {
  const clickHandle = (event) => {
    onItemClick({ nextView: event.target.value });
  };

  return (
    <Select
      disableUnderline
      value={currentView}
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
  currentView: PropTypes.string,
  availableViews: PropTypes.array,
};

Switcher.defaultProps = {
  currentView: undefined,
  availableViews: [],
};
