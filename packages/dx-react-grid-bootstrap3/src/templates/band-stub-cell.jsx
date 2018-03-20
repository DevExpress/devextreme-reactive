import * as React from 'react';
import * as PropTypes from 'prop-types';

export const BandStubCell = ({
  style,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <th
    style={{
      padding: 0,
      borderLeft: '1px solid #ddd',
      ...style,
    }}
    {...restProps}
  />
);

BandStubCell.propTypes = {
  style: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

BandStubCell.defaultProps = {
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
};
