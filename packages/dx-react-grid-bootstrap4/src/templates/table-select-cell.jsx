import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableSelectCell = ({
  className, selected,
  onToggle, row,
  tableRow, tableColumn,
  ...restProps
}) => (

  <td
    className={classNames('dx-rg-bs4-cursor-pointer align-middle', className)}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    <input
      className="d-block m-auto dx-rg-bs4-cursor-pointer"
      type="checkbox"
      checked={selected}
      onChange={onToggle}
      onClick={e => e.stopPropagation()}
    />
  </td>
);

TableSelectCell.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSelectCell.defaultProps = {
  className: undefined,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
