import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ToggleButton } from './parts/toggle-button';

export const TableDetailToggleCell = ({
  expanded, onToggle,
  tableColumn, tableRow, row, style,
  ...restProps
}) => (
  <td
    style={{
      cursor: 'pointer',
      verticalAlign: 'middle',
      textAlign: 'center',
      ...style,
    }}
    {...restProps}
  >
    <ToggleButton
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
  row: PropTypes.object,
};

TableDetailToggleCell.defaultProps = {
  style: null,
  expanded: false,
  onToggle: () => {},
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
};
