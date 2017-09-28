import React from 'react';
import PropTypes from 'prop-types';

export const ColumnChooserPanelItem = ({ column, hidden, onClick }) => {
  const handleClick = () => onClick(column.name);
  return (
    <button
      className="list-group-item"
      style={{ outline: 'none' }}
      type="button"
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={!hidden}
        onChange={handleClick}
      />
      &nbsp;
      {column.title || column.name}
    </button>
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
