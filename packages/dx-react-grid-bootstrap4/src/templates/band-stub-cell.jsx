import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BandStubCell = ({
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <th
    className={classNames('p-0 border-0', className)}
    {...restProps}
  />
);

BandStubCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

BandStubCell.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
