import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export const ColumnChooserPanelItem = ({ column, hidden, onClick }) => {
  const handleClick = () => onClick(column.name);
  return (
    <ListItem
      key={column.name}
      button
      dense
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
  column: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  hidden: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

ColumnChooserPanelItem.defaultProps = {
  onClick: undefined,
};
