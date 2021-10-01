import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export const TableStubCell = ({
  className,
  tableRow,
  tableColumn,
  refObject,
  ...restProps
}) => (
  <td
    className={classNames({
      'p-0': true,
    }, className)}
    ref={refObject}
    {...restProps}
  />
);

TableStubCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
};

TableStubCell.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
};
