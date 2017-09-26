import React from 'react';
import PropTypes from 'prop-types';

export const ColumnChooserPanel = ({ columnChooserItems, onColumnToggle }) => (
  <div className="list-group">
    {columnChooserItems.map((item) => {
      const handleChange = () => onColumnToggle(item.column.name);
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
  onColumnToggle: PropTypes.func,
};

ColumnChooserPanel.defaultProps = {
  columnChooserItems: [],
  onColumnToggle: undefined,
};
