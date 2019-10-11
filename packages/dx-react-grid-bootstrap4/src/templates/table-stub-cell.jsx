import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableStubCell = ({
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <td
    className={classNames('p-0', className)}
    {...restProps}
  />
);

TableStubCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableStubCell.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
