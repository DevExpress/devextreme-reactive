import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableNoDataCell = ({
  style,
  colSpan,
  getMessage,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <td
    style={{
      textAlign: 'center',
      padding: '40px 0',
      ...style,
    }}
    colSpan={colSpan}
    {...restProps}
  >
    <big className="text-muted">
      {getMessage('noData')}
    </big>
  </td>
);

TableNoDataCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  getMessage: PropTypes.func.isRequired,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableNoDataCell.defaultProps = {
  style: null,
  colSpan: 1,
  tableRow: undefined,
  tableColumn: undefined,
};
