import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableTreeCell = ({
  controls,
  column, value, children,
  tableRow, tableColumn, row,
  style,
  ...restProps
}) => (
  <td
    style={{
      textAlign: (tableColumn && tableColumn.align) || 'left',
      ...style,
    }}
    {...restProps}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {controls}
      <div
        style={{
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children || value}
      </div>
    </div>
  </td>
);

TableTreeCell.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.object,
  controls: PropTypes.node,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
};

TableTreeCell.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  controls: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
};
