import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './table-group-row-cell.css';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const TableGroupCell = ({
  className, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  ...restProps
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
      className={classNames('dx-rg-bs4-cursor-pointer', className)}
      onClick={handleClick}
      {...restProps}
    >
      <span
        className={classNames({
          'oi dx-rg-bs4-table-group-row-cell': true,
          'oi-chevron-bottom mr-2': expanded,
          'oi-chevron-right': !expanded,
        })}
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
  className: PropTypes.string,
  colSpan: PropTypes.number,
  row: PropTypes.object,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableGroupCell.defaultProps = {
  className: undefined,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  onToggle: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
