import { DxTableEditColumn as DxTableEditColumnBase } from '@devexpress/dx-vue-grid';
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

export const DxTableEditColumn = {
  name: 'DxTableEditColumn',
  functional: true,
  render(h, context) {
    return (
      <DxTableEditColumnBase
        cellComponent={EditCommandCell}
        headerCellComponent={EditCommandHeadingCell}
        commandComponent={CommandButton}
        messages={{ ...defaultMessages, ...context.messages }}
        {...{ attrs: context.props, on: context.listeners }}
      />
    );
  },
  components: {
    DxCommand: CommandButton,
    DxCell: EditCommandCell,
    DxHeaderCell: EditCommandHeadingCell,
  },
};
