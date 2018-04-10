import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import { SelectionControl } from './parts/selection-control';

export const TableSelectCell = ({
  className,
  selected,
  onToggle,
  row, tableRow, tableColumn,
  ...restProps
}) => (
  <td
    className={classNames('text-center align-middle', className)}
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
