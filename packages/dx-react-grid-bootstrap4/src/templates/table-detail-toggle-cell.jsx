import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './table-detail-toggle-cell.css';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const TableDetailToggleCell = ({
  expanded, onToggle, className,
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
      className={classNames('align-middle dx-rg-bs4-cursor-pointer', className)}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      {...restProps}
    >
      <span
        className={classNames({
          'oi d-block dx-rg-bs4-table-detail-toggle-cell-icon': true,
          'oi-chevron-bottom': expanded,
          'oi-chevron-right': !expanded,
        })}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
      />
    </td>
  );
};

TableDetailToggleCell.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.object,
  className: PropTypes.string,
};

TableDetailToggleCell.defaultProps = {
  expanded: false,
  onToggle: () => {},
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  className: undefined,
};
