import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { ExpandButton } from './parts/expand-button';

export const TableGroupCell = ({
  className, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <td
      colSpan={colSpan}
      className={classNames('dx-g-bs4-cursor-pointer', className)}
      onClick={handleClick}
      {...restProps}
    >
      <ExpandButton
        expanded={expanded}
        onToggle={onToggle}
        className="mr-2"
      />
      <strong>{column.title || column.name}: </strong>
      {children || row.value}
    </td>
  );
};

TableGroupCell.propTypes = {
  className: PropTypes.string,
  colSpan: PropTypes.number,
  row: PropTypes.any,
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
