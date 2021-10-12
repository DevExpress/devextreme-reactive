import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableStubHeaderCell = ({
  className,
  tableRow,
  tableColumn,
  forwardedRef,
  ...restProps
}) => (
  <th
    className={classNames({
      'p-0': true,
    }, className)}
    ref={forwardedRef}
    {...restProps}
  />
);

TableStubHeaderCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  forwardedRef: PropTypes.object,
};

TableStubHeaderCell.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  forwardedRef: undefined,
};
