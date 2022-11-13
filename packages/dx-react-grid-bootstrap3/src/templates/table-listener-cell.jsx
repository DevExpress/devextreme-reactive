import * as React from 'react';
import PropTypes from 'prop-types';
import { Sizer } from '@devexpress/dx-react-core';
import { TableStubCell } from './table-stub-cell';

export const TableBorderlessStubCell = ({ style, ...restParams }) => (
  <TableStubCell
    style={{
      border: 'none',
      ...style,
    }}
    {...restParams}
  />
);

TableBorderlessStubCell.propTypes = {
  style: PropTypes.object,
};

TableBorderlessStubCell.defaultProps = {
  style: null,
};

export const TableListenerCell = ({ listen, onSizeChange, ...restProps }) => (listen ? (
  <Sizer
    containerComponent={TableBorderlessStubCell}
    onSizeChange={onSizeChange}
    {...restProps}
  />
) : (
  <TableBorderlessStubCell {...restProps} />
));

TableListenerCell.propTypes = {
  listen: PropTypes.bool.isRequired,
  onSizeChange: PropTypes.func.isRequired,
};
