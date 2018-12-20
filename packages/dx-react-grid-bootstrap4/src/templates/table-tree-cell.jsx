import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const TableTreeCell = ({
  column, children, tableRow,
  tableColumn, row, ...restProps
}) => (
  <td
    {...restProps}
  >
    <div
      className={classNames({
        'd-flex flex-direction-row align-items-center': true,
        'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
      })}
    >
      {children}
    </div>
  </td>
);

TableTreeCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  style: PropTypes.object,
};

TableTreeCell.defaultProps = {
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  style: null,
};
