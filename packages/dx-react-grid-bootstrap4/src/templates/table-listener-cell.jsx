import * as React from 'react';
import PropTypes from 'prop-types';
import { Sizer } from '@devexpress/dx-react-core';
import classNames from 'clsx';
import { TableStubCell } from './table-stub-cell';

const TableBorderlessStubCell = ({ className, ...restProps }) => (
  <TableStubCell
    className={classNames('border-0', className)}
    {...restProps}
  />
);

TableBorderlessStubCell.propTypes = {
  className: PropTypes.string,
};

TableBorderlessStubCell.defaultProps = {
  className: undefined,
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
