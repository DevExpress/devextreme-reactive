import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { SelectionControl } from './parts/selection-control';

export const TableSelectAllCell = ({
  className, allSelected, someSelected, disabled, onToggle,
  tableColumn, tableRow,
  ...restProps
}) => (
  <th
    className={classNames('text-center align-middle', className)}
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
  className: PropTypes.string,
  allSelected: PropTypes.bool,
  someSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableSelectAllCell.defaultProps = {
  className: undefined,
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: () => {},
  tableRow: undefined,
  tableColumn: undefined,
};
