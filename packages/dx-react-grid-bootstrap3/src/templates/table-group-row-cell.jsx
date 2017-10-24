import React from 'react';
import PropTypes from 'prop-types';

export const TableGroupCell = ({
  style, colSpan, row, column, isExpanded, toggleGroupExpanded, children,
}) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) toggleGroupExpanded();
  };

  return (
    <td
      colSpan={colSpan}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onClick={toggleGroupExpanded}
      onKeyDown={handleKeyDown}
    >
      <i
        className={`glyphicon glyphicon-triangle-${isExpanded ? 'bottom' : 'right'}`}
        style={{
          fontSize: '9px',
          top: 0,
          marginRight: '10px',
        }}
      />
      <strong>{column.title || column.name}: </strong>
      {children || row.value}
    </td>
  );
};

TableGroupCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  row: PropTypes.object,
  column: PropTypes.object,
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

TableGroupCell.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
  children: undefined,
};
