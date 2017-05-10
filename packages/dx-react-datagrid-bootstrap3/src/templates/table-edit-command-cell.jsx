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
  text: PropTypes.func.isRequired,
};

export const EditCommandHeadingCell = ({
    addRow,
    commandTemplate,
    allowCreating,
    style = {},
    createCommandText = 'New',
  }) => (
    <th
      style={{
        whiteSpace: 'nowrap',
        textAlign: 'center',
        padding: 0,
        ...style,
      }}
    >
      {allowCreating && commandTemplate({
        id: 'create',
        executeCommand: addRow,
        text: createCommandText,
      })}
    </th>
);
EditCommandHeadingCell.propTypes = {
  addRow: PropTypes.func.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  createCommandText: PropTypes.string.isRequired,
  allowCreating: PropTypes.bool.isRequired,
  style: PropTypes.object,
};
EditCommandHeadingCell.defaultProps = {
  style: undefined,
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
    style = {},
    editCommandText = 'Edit',
    deleteCommandText = 'Delete',
    commitCommandText = 'Save',
    cancelCommandText = 'Cancel',
  }) => {
  let commands = [];
  if (!isEditing) {
    if (allowEditing) {
      commands.push({
        id: 'edit',
        executeCommand: startEditing,
        text: editCommandText,
      });
    }
    if (allowDeleting) {
      commands.push({
        id: 'delete',
        executeCommand: deleteRow,
        text: deleteCommandText,
      });
    }
  } else {
    commands = [
      {
        id: 'commit',
        executeCommand: commitChanges,
        text: commitCommandText,
      },
      {
        id: 'cancel',
        executeCommand: cancelEditing,
        text: cancelCommandText,
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
  editCommandText: PropTypes.string.isRequired,
  deleteCommandText: PropTypes.string.isRequired,
  commitCommandText: PropTypes.string.isRequired,
  cancelCommandText: PropTypes.string.isRequired,
  style: PropTypes.object,
};
EditCommandCell.defaultProps = {
  style: undefined,
};
