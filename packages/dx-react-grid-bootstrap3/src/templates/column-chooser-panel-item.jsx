import React from 'react';
import PropTypes from 'prop-types';

export const ColumnChooserPanelItem = ({ item: { column, hidden }, onToggle }) => {
  const handleChange = () => onToggle(!hidden);
  return (
    <button
      className="list-group-item"
      style={{ outline: 'none' }}
      type="button"
      onClick={handleChange}
    >
      <input
        type="checkbox"
        checked={!hidden}
        onChange={handleChange}
      />
      &nbsp;
      {column.title || column.name}
    </button>
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
