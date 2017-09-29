import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export const ColumnChooserPanelItem = ({ item: { column, hidden }, onToggle }) => {
  const handleClick = () => onToggle(!hidden);
  return (
    <ListItem
      key={column.name}
      button
      onClick={handleClick}
    >
      <Checkbox
        checked={!hidden}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText primary={column.title || column.name} />
    </ListItem>
  );
};

ColumnChooserPanelItem.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func,
};

ColumnChooserPanelItem.defaultProps = {
  onToggle: () => {},
};
