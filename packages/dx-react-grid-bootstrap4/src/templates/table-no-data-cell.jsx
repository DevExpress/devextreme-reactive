import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableNoDataCell = ({
  className, colSpan,
  getMessage, tableRow,
  tableColumn, ...restProps
}) => (
  <td
    className={classNames('py-5 dx-g-bs4-no-data-cell', className)}
    colSpan={colSpan}
    {...restProps}
  >
    <div className="dx-g-bs4-fixed-block">
      <big className="text-muted">
        {getMessage('noData')}
      </big>
    </div>
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
