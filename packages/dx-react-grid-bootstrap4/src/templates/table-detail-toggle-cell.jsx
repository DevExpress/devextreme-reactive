import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import { ExpandButton } from './parts/expand-button';

export const TableDetailToggleCell = ({
  expanded, onToggle,
  tableColumn, tableRow, row, className,
  refObject,
  ...restProps
}) => (
  <td
    className={classNames('text-center align-middle', className)}
    ref={refObject}
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
  refObject: PropTypes.object,
};

TableDetailToggleCell.defaultProps = {
  className: undefined,
  expanded: false,
  onToggle: () => {},
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  refObject: undefined,
};
