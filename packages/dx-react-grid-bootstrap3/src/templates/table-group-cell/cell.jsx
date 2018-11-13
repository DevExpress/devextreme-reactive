import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Cell = ({
  style, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  iconComponent: Icon, contentComponent: Content,
  ...restProps
}) => (
  <td
    colSpan={colSpan}
    style={{
      cursor: 'pointer',
      ...style,
    }}
    onClick={onToggle}
    {...restProps}
  >
    <Icon
      expanded={expanded}
      onToggle={onToggle}
      style={{
        marginRight: '8px',
      }}
    />
    <Content
      column={column}
      row={row}
    >
      {children}
    </Content>
  </td>
);

Cell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  row: PropTypes.any,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  iconComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  onToggle: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
