import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import {
    Button,
    TableCell,
} from 'material-ui';

const styleSheet = createStyleSheet('EditColumn', theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    minWidth: 40,
  },
  headingCell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 3,
  },
  cell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
  },
}));

const withEditColumnStyles = withStyles(styleSheet);

const CommandButtonBase = ({ executeCommand, text, classes }) => (
  <Button
    primary
    className={classes.button}
    onClick={(e) => {
      executeCommand();
      e.stopPropagation();
    }}
  >
    {text}
  </Button>
);
CommandButtonBase.propTypes = {
  executeCommand: PropTypes.func.isRequired,
  text: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const CommandButton = withEditColumnStyles(CommandButtonBase);

const EditCommandHeadingCellBase = ({
    addRow,
    commandTemplate,
    allowAdding,
    style = {},
    addCommandText = 'New',
    classes,
  }) => (
    <TableCell
      className={classes.headingCell}
      style={style}
    >
      {allowAdding && commandTemplate({
        id: 'add',
        executeCommand: addRow,
        text: addCommandText,
      })}
    </TableCell>
);
EditCommandHeadingCellBase.propTypes = {
  addRow: PropTypes.func.isRequired,
  commandTemplate: PropTypes.func.isRequired,
  addCommandText: PropTypes.string.isRequired,
  allowAdding: PropTypes.bool.isRequired,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};
EditCommandHeadingCellBase.defaultProps = {
  style: undefined,
};

export const EditCommandHeadingCell = withEditColumnStyles(EditCommandHeadingCellBase);

const EditCommandCellBase = ({
    startEditing,
    deleteRow,
    cancelEditing,
    commitChanges,
    isEditing,
    commandTemplate,
    allowEditing,
    allowDeleting,
    style = {},
    classes,
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
    <TableCell
      className={classes.cell}
      style={style}
    >
      {commands.map(command => (<span key={command.id}>{commandTemplate(command)}</span>))}
    </TableCell>
  );
};
EditCommandCellBase.propTypes = {
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
  classes: PropTypes.object.isRequired,
};
EditCommandCellBase.defaultProps = {
  style: undefined,
};

export const EditCommandCell = withEditColumnStyles(EditCommandCellBase);
