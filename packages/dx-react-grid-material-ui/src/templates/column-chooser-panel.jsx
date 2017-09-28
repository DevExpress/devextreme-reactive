import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

export const ColumnChooserPanel = ({ columnChooserItems, onColumnToggle, itemTemplate }) => (
  <List dense>
    {columnChooserItems.map(({ column, hidden }) => React.cloneElement(
      itemTemplate({ column, hidden, onClick: onColumnToggle }),
      { key: column.name },
    ))}
  </List>
);

ColumnChooserPanel.propTypes = {
  columnChooserItems: PropTypes.arrayOf(PropTypes.shape({
    column: PropTypes.shape({
      name: PropTypes.string,
    }),
    hidden: PropTypes.bool,
  })),
  onColumnToggle: PropTypes.func,
  itemTemplate: PropTypes.func.isRequired,
};

ColumnChooserPanel.defaultProps = {
  columnChooserItems: [],
  onColumnToggle: undefined,
};
