import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableStubHeaderCell = ({
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <th
    className={classNames('p-0', className)}
    {...restProps}
  />
);

TableStubHeaderCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableStubHeaderCell.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
