import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const IndentCell = ({
  left,
  tableRow,
  tableColumn,
  row, column,
  style, className,
  ...restProps,
}) => (
  <td
    className={classNames('position-sticky dx-g-bs4-fixed-cell', className)}
    style={{ ...style, left }}
    {...restProps}
  />
);

IndentCell.propTypes = {
  left: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  column: PropTypes.object,
  style: PropTypes.object,
};

IndentCell.defaultProps = {
  left: "",
  tableRow: undefined,
  tableColumn: undefined,
  row: {},
  column: {},
  style: null,
};
