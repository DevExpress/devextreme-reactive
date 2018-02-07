import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-grid';
import {
  EditCommandCell,
  EditCommandHeadingCell,
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
        width={150}
        {...restProps}
      />
    );
  }
}

TableEditColumn.Command = CommandButton;
TableEditColumn.Cell = EditCommandCell;
TableEditColumn.HeaderCell = EditCommandHeadingCell;

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
