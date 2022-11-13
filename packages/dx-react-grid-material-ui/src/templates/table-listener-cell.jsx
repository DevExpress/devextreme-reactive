import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { Sizer } from '@devexpress/dx-react-core';
import { styled } from '@mui/material/styles';
import { TableStubCell } from './table-stub-cell';

const PREFIX = 'TableListenerCell';
export const classes = {
  cell: `${PREFIX}-cell`,
};

const StyledTableStubCell = styled(TableStubCell)(() => ({
  [`&.${classes.cell}`]: {
    border: 0,
  },
}));

const TableBorderlessStubCell = ({
  className,
  ...restProps
}) => (
  <StyledTableStubCell
    className={classNames(classes.cell, className)}
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
