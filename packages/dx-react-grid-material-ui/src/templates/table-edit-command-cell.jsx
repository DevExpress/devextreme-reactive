import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import {
    Button,
    TableCell,
} from 'material-ui';

export const styleSheet = createStyleSheet('EditColumn', theme => ({
  button: {
    padding: theme.spacing.unit,
    minWidth: 40,
  },
  headingCell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: 0,
  },
  cell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: 0,
  },
}));

const withEditColumnStyles = withStyles(styleSheet);

const CommandButtonBase = ({ executeCommand, text, classes }) => (
  <Button
    color="primary"
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
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export const CommandButton = withEditColumnStyles(CommandButtonBase);

const EditCommandHeadingCellBase = ({
    addRow,
    commandTemplate,
    allowAdding,
    style = {},
    addCommandText,
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
  addRow: PropTypes.func,
  addCommandText: PropTypes.string,
  allowAdding: PropTypes.bool,
  commandTemplate: PropTypes.func.isRequired,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};
EditCommandHeadingCellBase.defaultProps = {
  addRow: () => {},
  addCommandText: 'New',
  allowAdding: false,
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
    <TableCell
      className={classes.cell}
      style={style}
    >
      {commands.map(command => (<span key={command.id}>{commandTemplate(command)}</span>))}
    </TableCell>
  );
};
EditCommandCellBase.propTypes = {
  startEditing: PropTypes.func,
  deleteRow: PropTypes.func,
  cancelEditing: PropTypes.func,
  commitChanges: PropTypes.func,
  isEditing: PropTypes.bool,
  allowEditing: PropTypes.bool,
  allowDeleting: PropTypes.bool,
  commandTemplate: PropTypes.func,
  editCommandText: PropTypes.string,
  deleteCommandText: PropTypes.string,
  commitCommandText: PropTypes.string,
  cancelCommandText: PropTypes.string,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};
EditCommandCellBase.defaultProps = {
  startEditing: () => {},
  deleteRow: () => {},
  cancelEditing: () => {},
  commitChanges: () => {},
  isEditing: false,
  allowEditing: false,
  allowDeleting: false,
  commandTemplate: PropTypes.func,
  editCommandText: 'Edit',
  deleteCommandText: 'Delete',
  commitCommandText: 'Save',
  cancelCommandText: 'Cancel',
  style: undefined,
};

export const EditCommandCell = withEditColumnStyles(EditCommandCellBase);
