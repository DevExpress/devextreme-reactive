import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export const ColumnChooserPanel = ({ columnChooserItems, onHiddenColumnNamesChange }) => (
  <List dense>
    {columnChooserItems.map(item => (
      <ListItem
        key={item.column.name}
        button
        dense
        onClick={() => onHiddenColumnNamesChange(item.column.name)}
      >
        <Checkbox
          checked={!item.hidden}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={item.column.title || item.column.name} />
      </ListItem>
    ))}
  </List>
);

ColumnChooserPanel.propTypes = {
  columnChooserItems: PropTypes.arrayOf(PropTypes.shape()),
  onHiddenColumnNamesChange: PropTypes.func,
};

ColumnChooserPanel.defaultProps = {
  columnChooserItems: [],
  onHiddenColumnNamesChange: undefined,
};
