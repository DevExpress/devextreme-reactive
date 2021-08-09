import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import { SelectionControl } from './parts/selection-control';

export const TableSelectCell = ({
  className,
  selected,
  onToggle,
  row, tableRow, tableColumn,
  refObject,
  ...restProps
}) => (
  <td
    className={classNames('text-center align-middle', className)}
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
  className: PropTypes.string,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  row: PropTypes.any,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
};

TableSelectCell.defaultProps = {
  className: undefined,
  selected: false,
  onToggle: () => {},
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
};
