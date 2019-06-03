import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const IndentCell = ({
  tableRow,
  tableColumn,
  row, column,
  style, className,
  position, side,
  ...restProps
}) => (
  <td
    className={classNames('position-sticky dx-g-bs4-fixed-cell', className)}
    style={{ ...style, [side]: position }}
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
};
