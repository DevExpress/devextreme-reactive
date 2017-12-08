import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const TableDetailToggleCell = ({
  style,
  expanded,
  onToggle,
  tableColumn, tableRow, row,
  ...restProps
}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE) {
      e.preventDefault();
      onToggle();
    }
  };
  return (
    <td
      style={{
        cursor: 'pointer',
        verticalAlign: 'middle',
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      {...restProps}
    >
      <i
        className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`}
        style={{
          fontSize: '9px',
          top: '0',
          display: 'block',
        }}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
      />
    </td>
  );
};

TableDetailToggleCell.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.object,
};

TableDetailToggleCell.defaultProps = {
  style: null,
  expanded: false,
  onToggle: () => {},
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
};
