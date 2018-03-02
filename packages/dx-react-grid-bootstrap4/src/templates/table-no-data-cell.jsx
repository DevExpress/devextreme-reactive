import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableNoDataCell = ({
  className, colSpan,
  getMessage, tableRow,
  tableColumn, ...restProps
}) => (
  <td
    className={classNames('py-5 text-center', className)}
    colSpan={colSpan}
    {...restProps}
  >
    <big className="text-muted">{getMessage('noData')}</big>
  </td>
);

TableNoDataCell.propTypes = {
  colSpan: PropTypes.number,
  getMessage: PropTypes.func.isRequired,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
};

TableNoDataCell.defaultProps = {
  className: undefined,
  colSpan: 1,
  tableRow: undefined,
  tableColumn: undefined,
};
