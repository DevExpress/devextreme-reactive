import React from 'react';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-datagrid';
import { EditCell } from '../templates/table-edit-cell';

export const TableEditRow = ({ editCellTemplate }) => (
  <TableEditRowBase editCellTemplate={editCellTemplate || EditCell} />
);
TableEditRow.propTypes = {
  editCellTemplate: React.PropTypes.func,
};
TableEditRow.defaultProps = {
  editCellTemplate: undefined,
};
