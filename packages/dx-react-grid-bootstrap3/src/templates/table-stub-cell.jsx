import * as React from 'react';
import PropTypes from 'prop-types';

export const TableStubCell = ({
  style,
  tableRow,
  tableColumn,
  forwardedRef,
  ...restProps
}) => (
  <td
    ref={forwardedRef}
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
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TableStubCell.defaultProps = {
  style: null,
  tableRow: undefined,
  tableColumn: undefined,
  forwardedRef: undefined,
};
