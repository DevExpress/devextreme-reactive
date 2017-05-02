import React from 'react';
import PropTypes from 'prop-types';

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
  onCommand: PropTypes.func.isRequired,
  text: PropTypes.func.isRequired,
};

export const EditCommandHeadingCell = ({
    onAddNewRow,
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
        onCommand: onAddNewRow,
        text: createCommandText,
      })}
    </th>
);
EditCommandHeadingCell.propTypes = {
  onAddNewRow: PropTypes.func.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  createCommandText: PropTypes.string.isRequired,
  allowCreating: PropTypes.bool.isRequired,
  style: PropTypes.object,
};
EditCommandHeadingCell.defaultProps = {
  style: undefined,
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
        ...style,
      }}
    >
      {commands.map(command => (<span key={command.id}>{commandTemplate(command)}</span>))}
    </td>
  );
};
EditCommandCell.propTypes = {
  onStartEditing: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancelEditing: PropTypes.func.isRequired,
  onCommitChanges: PropTypes.func.isRequired,
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
