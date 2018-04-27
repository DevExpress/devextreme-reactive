import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-vue-grid';
import {
  EditCommandHeadingCell,
  EditCommandCell,
  CommandButton,
} from '../templates/table-edit-command-cell';

const defaultMessages = {
  addCommand: 'New',
  editCommand: 'Edit',
  deleteCommand: 'Delete',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
};

export const TableEditColumn = {
  name: 'TableEditColumn',
  functional: true,
  render(h, context) {
    return (
      <TableEditColumnBase
        cellComponent={EditCommandCell}
        headerCellComponent={EditCommandHeadingCell}
        commandComponent={CommandButton}
        messages={{ ...defaultMessages, ...context.messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
};

TableEditColumn.Command = CommandButton;
TableEditColumn.Cell = EditCommandCell;
TableEditColumn.HeaderCell = EditCommandHeadingCell;
