import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SelectionControl } from './parts/selection-control';

export const TableSelectCell = ({
  style,
  selected,
  onToggle,
  row, tableRow, tableColumn,
  refObject,
  ...restProps
}) => (
  <td
    style={{
      verticalAlign: 'middle',
      textAlign: 'center',
      ...style,
    }}
    ref={refObject}
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
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
};

TableSelectCell.defaultProps = {
  style: null,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
};
