import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const IndentCell = ({
  tableRow,
  tableColumn,
  row, column,
  style, className,
  position, side,
  forwardedRef,
  ...restProps
}) => (
  <td
    className={classNames('position-sticky dx-g-bs4-fixed-cell', className)}
    style={{ ...style, [side]: position }}
    ref={forwardedRef}
    {...restProps}
  />
);

IndentCell.propTypes = {
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  column: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  side: PropTypes.string,
  position: PropTypes.number,
  forwardedRef: PropTypes.func,
};

IndentCell.defaultProps = {
  tableRow: undefined,
  tableColumn: undefined,
  row: {},
  column: {},
  className: undefined,
  style: null,
  side: 'left',
  position: undefined,
  forwardedRef: undefined,
};
