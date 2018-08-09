import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TABLE_EDIT_COMMAND_TYPE } from '@devexpress/dx-grid-core';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-grid';
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

export class TableEditColumn extends React.PureComponent {
  render() {
    const {
      messages,
      ...restProps
    } = this.props;

    return (
      <TableEditColumnBase
        cellComponent={EditCommandCell}
        headerCellComponent={EditCommandHeadingCell}
        commandComponent={CommandButton}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableEditColumn.Command = CommandButton;
TableEditColumn.Cell = EditCommandCell;
TableEditColumn.HeaderCell = EditCommandHeadingCell;
TableEditColumn.COLUMN_TYPE = TABLE_EDIT_COMMAND_TYPE;

TableEditColumn.propTypes = {
  messages: PropTypes.shape({
    addCommand: PropTypes.string,
    editCommand: PropTypes.string,
    deleteCommand: PropTypes.string,
    commitCommand: PropTypes.string,
    cancelCommand: PropTypes.string,
  }),
};

TableEditColumn.defaultProps = {
  messages: {},
};
