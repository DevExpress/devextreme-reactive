import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableNoDataCell = ({
  className, colSpan,
  getMessage, tableRow,
  tableColumn, ...restProps
}) => (
  <td
    className={classNames('p-0 py-5', className)}
    colSpan={colSpan}
    {...restProps}
  >
    <big className="text-muted dx-g-bs4-fixed-block">
      {getMessage('noData')}
    </big>
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
