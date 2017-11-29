import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    paddingRight: theme.spacing.unit * 2,
  },
  cell: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 2,
  },
});

const withEditColumnStyles = withStyles(styles, { name: 'EditColumn' });

const CommandButtonBase = ({
  executeCommand,
  text,
  classes,
  className,
  ...restProps
}) => (
  <Button
    color="primary"
    className={classNames(classes.button, className)}
    onClick={(e) => {
      executeCommand();
      e.stopPropagation();
    }}
    {...restProps}
  >
    {text}
  </Button>
);
CommandButtonBase.propTypes = {
  executeCommand: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

CommandButtonBase.defaultProps = {
  className: undefined,
};

export const CommandButton = withEditColumnStyles(CommandButtonBase);

const EditCommandHeadingCellBase = ({
  addRow,
  commandTemplate,
  allowAdding,
  style = {},
  getMessage,
  classes,
  className,
  tableRow, tableColumn,
  ...restProps
}) => (
  <TableCell
    className={classNames(classes.headingCell, className)}
    style={style}
    {...restProps}
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
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};
EditCommandHeadingCellBase.defaultProps = {
  addRow: () => {},
  allowAdding: false,
  style: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
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
  className,
  getMessage,
  tableRow, tableColumn,
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
    <TableCell
      className={classNames(classes.cell, className)}
      style={style}
      {...restProps}
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
  commandTemplate: PropTypes.func.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};
EditCommandCellBase.defaultProps = {
  startEditing: () => {},
  deleteRow: () => {},
  cancelEditing: () => {},
  commitChanges: () => {},
  isEditing: false,
  allowEditing: false,
  allowDeleting: false,
  style: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const EditCommandCell = withEditColumnStyles(EditCommandCellBase);
