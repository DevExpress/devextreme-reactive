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
  addCommandText,
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
      text: addCommandText,
    })}
  </th>
);

EditCommandHeadingCell.propTypes = {
  addRow: PropTypes.func.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  addCommandText: PropTypes.string,
  allowAdding: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

EditCommandHeadingCell.defaultProps = {
  style: {},
  addCommandText: 'New',
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
  editCommandText,
  deleteCommandText,
  commitCommandText,
  cancelCommandText,
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
  editCommandText: PropTypes.string,
  deleteCommandText: PropTypes.string,
  commitCommandText: PropTypes.string,
  cancelCommandText: PropTypes.string,
  style: PropTypes.object,
};

EditCommandCell.defaultProps = {
  style: {},
  editCommandText: 'Edit',
  deleteCommandText: 'Delete',
  commitCommandText: 'Save',
  cancelCommandText: 'Cancel',
};
