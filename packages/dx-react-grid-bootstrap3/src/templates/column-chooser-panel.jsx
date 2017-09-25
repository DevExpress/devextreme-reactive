import React from 'react';
import PropTypes from 'prop-types';

export const ColumnChooserPanel = ({ columnChooserItems, onHiddenColumnNamesChange }) => (
  <div className="list-group">
    {columnChooserItems.map((item) => {
      const handleChange = () => onHiddenColumnNamesChange(item.column.name);
      return (
        <button
          key={item.column.name}
          className="list-group-item"
          style={{ outline: 'none' }}
          type="button"
          onClick={handleChange}
        >
          <input
            type="checkbox"
            checked={!item.hidden}
            onChange={handleChange}
          />
          &nbsp;
          {item.column.title || item.column.name}
        </button>
      );
    })}
  </div>
);

ColumnChooserPanel.propTypes = {
  columnChooserItems: PropTypes.arrayOf(PropTypes.shape()),
  onHiddenColumnNamesChange: PropTypes.func,
};

ColumnChooserPanel.defaultProps = {
  columnChooserItems: [],
  onHiddenColumnNamesChange: undefined,
};
