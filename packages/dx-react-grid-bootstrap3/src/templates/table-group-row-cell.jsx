import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const TableGroupCell = ({
  style, colSpan, row, column, expanded, onToggle, children,
}) => {
  const handleClick = () => onToggle();
  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === ENTER_KEY_CODE || keyCode === SPACE_KEY_CODE) {
      e.preventDefault();
      onToggle();
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
    >
      <i
        className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`}
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
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
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
  expanded: false,
  onToggle: () => {},
  children: undefined,
};
