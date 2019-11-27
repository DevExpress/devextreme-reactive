import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import { ExpandButton } from './parts/expand-button';

export const TableDetailToggleCell = ({
  expanded, onToggle,
  tableColumn, tableRow, row, className,
  ...restProps
}) => (
  <td
    className={classNames('text-center align-middle', className)}
    {...restProps}
  >
    <ExpandButton
      expanded={expanded}
      onToggle={onToggle}
    />
  </td>
);

TableDetailToggleCell.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
};

TableDetailToggleCell.defaultProps = {
  className: undefined,
  expanded: false,
  onToggle: () => {},
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
};
