import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

import { ExpandButton } from './parts/expand-button';

export const TableDetailToggleCell = ({
  expanded, onToggle,
  tableColumn, tableRow, row, className,
  forwardedRef,
  ...restProps
}) => (
  <td
    className={classNames('text-center align-middle', className)}
    ref={forwardedRef}
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
  forwardedRef: PropTypes.func,
};

TableDetailToggleCell.defaultProps = {
  className: undefined,
  expanded: false,
  onToggle: () => {},
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  forwardedRef: undefined,
};
