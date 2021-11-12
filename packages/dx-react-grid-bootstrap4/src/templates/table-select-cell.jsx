import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import { SelectionControl } from './parts/selection-control';

export const TableSelectCell = ({
  className,
  selected,
  onToggle,
  row, tableRow, tableColumn,
  forwardedRef,
  ...restProps
}) => (
  <td
    className={classNames('text-center align-middle', className)}
    ref={forwardedRef}
    {...restProps}
  >
    <SelectionControl
      checked={selected}
      onChange={onToggle}
    />
  </td>
);

TableSelectCell.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  forwardedRef: PropTypes.func,
};

TableSelectCell.defaultProps = {
  className: undefined,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  forwardedRef: undefined,
};
