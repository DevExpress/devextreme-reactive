import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';

const getColor = (amount) => {
  if (amount < 3000) {
    return '#F44336';
  }
  if (amount < 5000) {
    return '#FFC107';
  }
  if (amount < 8000) {
    return '#FF5722';
  }
  return '#009688';
};

export const HighlightedCell = ({
  tableColumn, value, children, style,
  tabIndex, forwardedRef, className,
}) => (
  <TableCell
    className={className}
    sx={{ pl: 1, pr: 1 }}
    tabIndex={tabIndex}
    ref={forwardedRef}
    style={{
      color: getColor(value),
      textAlign: tableColumn.align,
      ...style,
    }}
  >
    {children}
  </TableCell>
);

HighlightedCell.propTypes = {
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  tableColumn: PropTypes.object,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  forwardedRef: PropTypes.func,
  className: PropTypes.string,
};
HighlightedCell.defaultProps = {
  style: {},
  tableColumn: {},
  children: undefined,
  tabIndex: undefined,
  forwardedRef: undefined,
  className: undefined,
};
