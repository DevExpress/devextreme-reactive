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
  getMessage,
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
      text: getMessage('addCommand'),
    })}
  </th>
);

EditCommandHeadingCell.propTypes = {
  addRow: PropTypes.func.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  allowAdding: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

EditCommandHeadingCell.defaultProps = {
  style: {},
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
  getMessage,
}) => {
  let commands = [];
  if (!isEditing) {
    if (allowEditing) {
      commands.push({
        id: 'edit',
        executeCommand: startEditing,
        text: getMessage('editCommand'),
      });
    }
    if (allowDeleting) {
      commands.push({
        id: 'delete',
        executeCommand: deleteRow,
        text: getMessage('deleteCommand'),
      });
    }
  } else {
    commands = [
      {
        id: 'commit',
        executeCommand: commitChanges,
        text: getMessage('commitCommand'),
      },
      {
        id: 'cancel',
        executeCommand: cancelEditing,
        text: getMessage('cancelCommand'),
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
  getMessage: PropTypes.func.isRequired,
  style: PropTypes.object,
};

EditCommandCell.defaultProps = {
  style: {},
};
