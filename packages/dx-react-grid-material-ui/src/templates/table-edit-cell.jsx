import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import {
  TableCell,
  Input,
} from 'material-ui';

const styles = theme => ({
  cell: {
    verticalAlign: 'top',
    paddingTop: theme.spacing.unit + 2,
    paddingRight: theme.spacing.unit,
    '& ~ $cell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  inputRoot: {
    width: '100%',
  },
  inputRight: {
    textAlign: 'right',
  },
});

const EditCellBase = ({ column, value, onValueChange, style, classes }) => {
  const inputClasses = classNames(
    {
      [classes.inputRight]: column.align === 'right',
    },
  );

  return (
    <TableCell
      className={classes.cell}
      style={style}
    >
      <Input
        className={classes.inputRoot}
        classes={{ input: inputClasses }}
        value={value || ''}
        onChange={e => onValueChange(e.target.value)}
      />
    </TableCell>
  );
};
EditCellBase.propTypes = {
  column: PropTypes.object,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
};
EditCellBase.defaultProps = {
  column: {},
  value: '',
  style: {},
};

export const EditCell = withStyles(styles, { name: 'EditCell' })(EditCellBase);
