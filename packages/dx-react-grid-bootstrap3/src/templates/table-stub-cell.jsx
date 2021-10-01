import * as React from 'react';
import * as PropTypes from 'prop-types';

export const TableStubCell = ({
  style,
  tableRow,
  tableColumn,
  refObject,
  ...restProps
}) => (
  <td
    ref={refObject}
    style={{
      padding: 0,
      ...style,
    }}
    {...restProps}
  />
);

TableStubCell.propTypes = {
  style: PropTypes.object,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  refObject: PropTypes.object,
};

TableStubCell.defaultProps = {
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
  refObject: undefined,
};
