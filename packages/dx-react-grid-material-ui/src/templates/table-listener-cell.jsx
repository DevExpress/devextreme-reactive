import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Sizer } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';
import { TableStubCell } from './table-stub-cell';

const styles = () => ({
  cell: {
    border: 0,
  },
});

const TableBorderlessStubCellBase = ({
  className,
  classes,
  ...restProps
}) => (
  <TableStubCell
    className={classNames(classes.cell, className)}
    {...restProps}
  />
);

TableBorderlessStubCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TableBorderlessStubCellBase.defaultProps = {
  className: undefined,
};

const TableBorderlessStubCell = withStyles(styles, { name: 'TableBorderlessStubCell' })(TableBorderlessStubCellBase);

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
