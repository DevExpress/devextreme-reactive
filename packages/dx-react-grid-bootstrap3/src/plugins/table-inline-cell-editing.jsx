import { withComponents } from '@devexpress/dx-react-core';
import { TableInlineCellEditing as TableInlineCellEditingBase } from '@devexpress/dx-react-grid';
import { EditCell as Cell } from '../templates/table-edit-cell';

export const TableInlineCellEditing = withComponents({ Cell })(TableInlineCellEditingBase);
