import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-grid';
import {
  EditCommandHeadingCell,
  EditCommandCell,
  CommandButton,
} from '../templates/table-edit-command-cell';

const defaultGetCommandComponent = () => CommandButton;

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
      getCommandComponent,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableEditColumnBase
        cellComponent={EditCommandCell}
        headerCellComponent={EditCommandHeadingCell}
        getCommandComponent={combineTemplates(getCommandComponent, defaultGetCommandComponent)}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableEditColumn.Command = CommandButton;
TableEditColumn.Cell = EditCommandCell;
TableEditColumn.HeaderCell = EditCommandHeadingCell;

TableEditColumn.propTypes = {
  getCommandComponent: PropTypes.func,
  messages: PropTypes.shape({
    addCommand: PropTypes.string,
    editCommand: PropTypes.string,
    deleteCommand: PropTypes.string,
    commitCommand: PropTypes.string,
    cancelCommand: PropTypes.string,
  }),
};

TableEditColumn.defaultProps = {
  getCommandComponent: undefined,
  messages: {},
};
