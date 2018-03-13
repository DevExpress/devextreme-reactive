import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableStubHeaderCell = ({
  style,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <th
    style={{
      padding: 0,
      ...style,
    }}
    {...restProps}
  />
);

TableStubHeaderCell.propTypes = {
  style: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableStubHeaderCell.defaultProps = {
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
};
