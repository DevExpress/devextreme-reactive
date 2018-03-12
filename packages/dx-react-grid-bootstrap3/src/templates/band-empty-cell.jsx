import * as React from 'react';
import * as PropTypes from 'prop-types';

export const BandEmptyCell = ({
  style,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <th
    style={{
      padding: 0,
      borderBottom: 0,
      borderTop: 0,
      borderRight: 0,
      borderLeft: '1px solid #ddd',
      ...style,
    }}
    {...restProps}
  />
);

BandEmptyCell.propTypes = {
  style: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

BandEmptyCell.defaultProps = {
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
};
