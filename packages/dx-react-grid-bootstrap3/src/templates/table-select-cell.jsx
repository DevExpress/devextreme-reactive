import React from 'react';
import PropTypes from 'prop-types';

export const TableSelectCell = ({
  style,
  selected,
  changeSelected,
  row, tableRow, tableColumn,
  ...restProps
}) => (
  <td
    style={{
      cursor: 'pointer',
      verticalAlign: 'middle',
      ...style,
    }}
    onClick={(e) => {
      e.stopPropagation();
      changeSelected();
    }}
    {...restProps}
  >
    <input
      style={{
        cursor: 'pointer',
        margin: '0 auto',
        display: 'block',
      }}
      type="checkbox"
      checked={selected}
      onChange={changeSelected}
      onClick={e => e.stopPropagation()}
    />
  </td>
);
TableSelectCell.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSelectCell.defaultProps = {
  style: null,
  selected: false,
  changeSelected: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
