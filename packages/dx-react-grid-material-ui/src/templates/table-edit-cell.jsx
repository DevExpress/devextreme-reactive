import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import {
    TableCell,
    Input,
} from 'material-ui';

export const styleSheet = createStyleSheet('EditCell', theme => ({
  cell: {
    verticalAlign: 'top',
    paddingTop: theme.spacing.unit + 2,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  inputRoot: {
    width: '100%',
  },
  inputRight: {
    textAlign: 'right',
  },
}));

const EditCellBase = ({ column, value, onValueChange, classes }) => {
  const inputClasses = classNames(
    {
      [classes.inputRight]: column.align === 'right',
    },
  );

  return (
    <TableCell
      className={classes.cell}
    >
      <Input
        className={classes.inputRoot}
        inputClassName={inputClasses}
        value={value}
        onChange={e => onValueChange(e.target.value)}
      />
    </TableCell>
  );
};
EditCellBase.propTypes = {
  column: PropTypes.object.isRequired,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
EditCellBase.defaultProps = {
  value: undefined,
};

export const EditCell = withStyles(styleSheet)(EditCellBase);
