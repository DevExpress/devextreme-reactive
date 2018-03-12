import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BandEmptyCell = ({
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <th
    className={classNames('p-0 border-top-0 border-right-0 border-bottom-0 border-left dx-rg-band-first-child', className)}
    {...restProps}
  />
);

BandEmptyCell.propTypes = {
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

BandEmptyCell.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};
