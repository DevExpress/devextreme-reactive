import React from 'react';

export const CommandButton = ({ onCommand, text }) => (
  <button
    className="btn btn-link"
    onClick={(e) => {
      onCommand();
      e.stopPropagation();
    }}
  >
    {text}
  </button>
);
CommandButton.propTypes = {
  onCommand: React.PropTypes.func.isRequired,
  text: React.PropTypes.func.isRequired,
};

export const EditCommandHeadingCell = ({
    onAddNewRow,
    commandTemplate,
    allowCreating,
    createCommandText = 'New',
  }) => (
    <td
      style={{
        whiteSpace: 'nowrap',
        textAlign: 'center',
        padding: 0,
      }}
    >
      {allowCreating && commandTemplate({
        id: 'new',
        onCommand: onAddNewRow,
        text: createCommandText,
      })}
    </td>
);
EditCommandHeadingCell.propTypes = {
  onAddNewRow: React.PropTypes.func.isRequired,
  commandTemplate: React.PropTypes.func.isRequired,
  createCommandText: React.PropTypes.string.isRequired,
  allowCreating: React.PropTypes.bool.isRequired,
};

export const EditCommandCell = ({
    onStartEditing,
    onDelete,
    onCancelEditing,
    onCommitChanges,
    isEditing,
    commandTemplate,
    allowEditing,
    allowDeleting,
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
        onCommand: onStartEditing,
        text: editCommandText,
      });
    }
    if (allowDeleting) {
      commands.push({
        id: 'delete',
        onCommand: onDelete,
        text: deleteCommandText,
      });
    }
  } else {
    commands = [
      {
        id: 'commit',
        onCommand: onCommitChanges,
        text: commitCommandText,
      },
      {
        id: 'cancel',
        onCommand: onCancelEditing,
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
      }}
    >
      {commands.map(command => (<span key={command.id}>{commandTemplate(command)}</span>))}
    </td>
  );
};
EditCommandCell.propTypes = {
  onStartEditing: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onCancelEditing: React.PropTypes.func.isRequired,
  onCommitChanges: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool.isRequired,
  allowEditing: React.PropTypes.bool.isRequired,
  allowDeleting: React.PropTypes.bool.isRequired,
  commandTemplate: React.PropTypes.func.isRequired,
  editCommandText: React.PropTypes.string.isRequired,
  deleteCommandText: React.PropTypes.string.isRequired,
  commitCommandText: React.PropTypes.string.isRequired,
  cancelCommandText: React.PropTypes.string.isRequired,
};
