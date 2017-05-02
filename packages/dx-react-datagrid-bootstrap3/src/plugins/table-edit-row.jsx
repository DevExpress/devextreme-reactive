import React from 'react';
import PropTypes from 'prop-types';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-datagrid';
import { EditCell } from '../templates/table-edit-cell';

export const TableEditRow = ({
  editCellTemplate,
  ...restProps
}) => (
  <TableEditRowBase
    {...restProps}
    editCellTemplate={editCellTemplate || EditCell}
  />
);
TableEditRow.propTypes = {
  editCellTemplate: PropTypes.func,
};
TableEditRow.defaultProps = {
  editCellTemplate: undefined,
};
