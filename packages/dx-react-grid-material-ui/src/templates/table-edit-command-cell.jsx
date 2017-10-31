import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import {
  Button,
  TableCell,
} from 'material-ui';

const styles = theme => ({
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
});

const withEditColumnStyles = withStyles(styles, { name: 'EditColumn' });

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
  getMessage,
  classes,
}) => (
  <TableCell
    className={classes.headingCell}
    style={style}
  >
    {allowAdding && commandTemplate({
      id: 'add',
      executeCommand: addRow,
      text: getMessage('addCommand'),
    })}
  </TableCell>
);
EditCommandHeadingCellBase.propTypes = {
  addRow: PropTypes.func,
  allowAdding: PropTypes.bool,
  style: PropTypes.object,
  commandTemplate: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
EditCommandHeadingCellBase.defaultProps = {
  addRow: () => {},
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
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
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
  style: undefined,
};

export const EditCommandCell = withEditColumnStyles(EditCommandCellBase);
