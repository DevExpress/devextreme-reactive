import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-grid';
import {
  EditCommandCell,
  EditCommandHeadingCell,
  CommandButton,
} from '../templates/table-edit-command-cell';

const defaultCellTemplate = props => <EditCommandCell {...props} />;
const defaultHeadingCellTemplate = props => <EditCommandHeadingCell {...props} />;
const defaultCommandTemplate = props => <CommandButton {...props} />;

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
      cellTemplate,
      headingCellTemplate,
      commandTemplate,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableEditColumnBase
        cellTemplate={combineTemplates(cellTemplate, defaultCellTemplate)}
        headingCellTemplate={combineTemplates(headingCellTemplate, defaultHeadingCellTemplate)}
        commandTemplate={combineTemplates(commandTemplate, defaultCommandTemplate)}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableEditColumn.propTypes = {
  cellTemplate: PropTypes.func,
  headingCellTemplate: PropTypes.func,
  commandTemplate: PropTypes.func,
  messages: PropTypes.shape({
    addCommand: PropTypes.string,
    editCommand: PropTypes.string,
    deleteCommand: PropTypes.string,
    commitCommand: PropTypes.string,
    cancelCommand: PropTypes.string,
  }),
};

TableEditColumn.defaultProps = {
  cellTemplate: undefined,
  headingCellTemplate: undefined,
  commandTemplate: undefined,
  messages: {},
};
