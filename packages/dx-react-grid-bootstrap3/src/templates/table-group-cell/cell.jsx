import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Cell = ({
  row, column,
  tableRow, tableColumn,
  onToggle, children, style,
  forwardedRef,
  ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <td
      style={{
        cursor: 'pointer',
        // TOOD: extract to constant
        whiteSpace: (tableColumn && tableColumn.wordWrapEnabled) ? 'normal' : 'nowrap',
        ...style,
      }}
      ref={forwardedRef}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </td>
  );
};

Cell.propTypes = {
  row: PropTypes.any,
  column: PropTypes.object,
  colSpan: PropTypes.number,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
  forwardedRef: PropTypes.func,
};

Cell.defaultProps = {
  row: {},
  column: {},
  colSpan: 1,
  onToggle: () => {},
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
  forwardedRef: undefined,
};
