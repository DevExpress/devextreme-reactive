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
  children,
  style,
  classes,
}) => (
  <TableCell
    className={classes.headingCell}
    style={style}
  >
    {children}
  </TableCell>
);

EditCommandHeadingCellBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

EditCommandHeadingCellBase.defaultProps = {
  children: undefined,
  style: {},
};

export const EditCommandHeadingCell = withEditColumnStyles(EditCommandHeadingCellBase);

const EditCommandCellBase = ({
  children,
  style,
  classes,
}) => (
  <TableCell
    className={classes.cell}
    style={style}
  >
    {children}
  </TableCell>
);

EditCommandCellBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

EditCommandCellBase.defaultProps = {
  children: undefined,
  style: {},
};

export const EditCommandCell = withEditColumnStyles(EditCommandCellBase);
