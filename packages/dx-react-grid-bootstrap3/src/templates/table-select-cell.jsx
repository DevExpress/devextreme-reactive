import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableSelectCell = ({
  style,
  selected,
  onToggle,
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
      onToggle();
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
      onChange={onToggle}
      onClick={e => e.stopPropagation()}
    />
  </td>
);

TableSelectCell.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  row: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSelectCell.defaultProps = {
  style: null,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
