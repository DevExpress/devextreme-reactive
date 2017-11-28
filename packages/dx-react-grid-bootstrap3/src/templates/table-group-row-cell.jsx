import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const TableGroupCell = ({
  style, colSpan, row, column,
  isExpanded, toggleGroupExpanded,
  children, tableRow, tableColumn,
  ...restProps
}) => {
  const handleClick = () => toggleGroupExpanded();
  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE) {
      e.preventDefault();
      toggleGroupExpanded();
    }
  };

  return (
    <td
      colSpan={colSpan}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      onClick={handleClick}
      {...restProps}
    >
      <i
        className={`glyphicon glyphicon-triangle-${isExpanded ? 'bottom' : 'right'}`}
        style={{
          fontSize: '9px',
          top: 0,
          marginRight: '10px',
        }}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
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
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableGroupCell.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
