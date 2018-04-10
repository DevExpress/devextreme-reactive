import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SelectionControl } from './parts/selection-control';

export const TableSelectAllCell = ({
  style, allSelected, someSelected, disabled, onToggle,
  tableColumn, tableRow,
  ...restProps
}) => (
  <th
    style={{
      verticalAlign: 'middle',
      textAlign: 'center',
      ...style,
    }}
    {...restProps}
  >
    <SelectionControl
      disabled={disabled}
      checked={allSelected}
      indeterminate={someSelected}
      onChange={onToggle}
    />
  </th>
);

TableSelectAllCell.propTypes = {
  style: PropTypes.object,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSelectAllCell.defaultProps = {
  style: null,
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  tableRow: undefined,
  tableColumn: undefined,
};
