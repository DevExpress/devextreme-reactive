import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ExpandButton } from './parts/expand-button';

export const TableDetailToggleCell = ({
  expanded, onToggle,
  tableColumn, tableRow, row, style,
  forwardedRef,
  ...restProps
}) => (
  <td
    style={{
      cursor: 'pointer',
      verticalAlign: 'middle',
      textAlign: 'center',
      ...style,
    }}
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
  style: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  forwardedRef: PropTypes.func,
};

TableDetailToggleCell.defaultProps = {
  style: null,
  expanded: false,
  onToggle: () => {},
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  forwardedRef: undefined,
};
