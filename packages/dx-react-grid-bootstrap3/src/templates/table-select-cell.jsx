import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SelectionControl } from './parts/selection-control';

export const TableSelectCell = ({
  style,
  selected,
  onToggle,
  row, tableRow, tableColumn,
  ...restProps
}) => (

  <td
    style={{
      verticalAlign: 'middle',
      textAlign: 'center',
      ...style,
    }}
    {...restProps}
  >
    <SelectionControl
      checked={selected}
      onChange={onToggle}
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
