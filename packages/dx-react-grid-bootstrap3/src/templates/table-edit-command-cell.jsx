import React from 'react';
import PropTypes from 'prop-types';

export const CommandButton = ({ executeCommand, text }) => (
  <button
    className="btn btn-link"
    onClick={(e) => {
      executeCommand();
      e.stopPropagation();
    }}
  >
    {text}
  </button>
);

CommandButton.propTypes = {
  executeCommand: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export const EditCommandHeadingCell = ({
  addRow,
  commandTemplate,
  allowAdding,
  style,
  addCommand,
}) => (
  <th
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
  >
    {allowAdding && commandTemplate({
      id: 'add',
      executeCommand: addRow,
      text: addCommand,
    })}
  </th>
);

EditCommandHeadingCell.propTypes = {
  addRow: PropTypes.func.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  addCommand: PropTypes.string,
  allowAdding: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

EditCommandHeadingCell.defaultProps = {
  style: {},
  addCommand: 'New',
};

export const EditCommandCell = ({
  startEditing,
  deleteRow,
  cancelEditing,
  commitChanges,
  isEditing,
  commandTemplate,
  allowEditing,
  allowDeleting,
  style,
  editCommand,
  deleteCommand,
  commitCommand,
  cancelCommand,
}) => {
  let commands = [];
  if (!isEditing) {
    if (allowEditing) {
      commands.push({
        id: 'edit',
        executeCommand: startEditing,
        text: editCommand,
      });
    }
    if (allowDeleting) {
      commands.push({
        id: 'delete',
        executeCommand: deleteRow,
        text: deleteCommand,
      });
    }
  } else {
    commands = [
      {
        id: 'commit',
        executeCommand: commitChanges,
        text: commitCommand,
      },
      {
        id: 'cancel',
        executeCommand: cancelEditing,
        text: cancelCommand,
      },
    ];
  }
  return (
    <td
      style={{
        whiteSpace: 'nowrap',
        textAlign: 'center',
        padding: 0,
        ...style,
      }}
    >
      {commands.map(command => (<span key={command.id}>{commandTemplate(command)}</span>))}
    </td>
  );
};

EditCommandCell.propTypes = {
  startEditing: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  commitChanges: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  allowEditing: PropTypes.bool.isRequired,
  allowDeleting: PropTypes.bool.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  editCommand: PropTypes.string,
  deleteCommand: PropTypes.string,
  commitCommand: PropTypes.string,
  cancelCommand: PropTypes.string,
  style: PropTypes.object,
};

EditCommandCell.defaultProps = {
  style: {},
  editCommand: 'Edit',
  deleteCommand: 'Delete',
  commitCommand: 'Save',
  cancelCommand: 'Cancel',
};
