import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const CommandButton = ({
  executeCommand,
  text,
  className,
  ...restProps
}) => (
  <button
    className={classNames('btn', 'btn-link', className)}
    onClick={(e) => {
      executeCommand();
      e.stopPropagation();
    }}
    {...restProps}
  >
    {text}
  </button>
);

CommandButton.propTypes = {
  executeCommand: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CommandButton.defaultProps = {
  className: undefined,
};

export const EditCommandHeadingCell = ({
  addRow,
  commandTemplate,
  allowAdding,
  style,
  getMessage,
  tableColumn, tableRow,
  ...restProps
}) => (
  <th
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
    {...restProps}
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
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

EditCommandHeadingCell.defaultProps = {
  style: {},
  tableColumn: undefined,
  tableRow: undefined,
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
  tableColumn, tableRow,
  ...restProps
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
      {...restProps}
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
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

EditCommandCell.defaultProps = {
  style: {},
  tableColumn: undefined,
  tableRow: undefined,
};
