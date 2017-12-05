import React from 'react';
import PropTypes from 'prop-types';

import {
  Checkbox,
  TableCell,
} from 'material-ui';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  cell: {
    overflow: 'visible',
    paddingRight: 0,
    paddingLeft: theme.spacing.unit,
    textAlign: 'center',
  },
  checkbox: {
    marginTop: '-1px',
    marginBottom: '-1px',
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
  },
});

export const TableSelectCellBase = ({
  style, selected, onToggle, classes,
}) => (
  <TableCell
    padding="checkbox"
    style={style}
    className={classes.cell}
  >
    <Checkbox
      className={classes.checkbox}
      checked={selected}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    />
  </TableCell>
);

TableSelectCellBase.defaultProps = {
  style: null,
  selected: false,
  onToggle: () => {},
};

TableSelectCellBase.propTypes = {
  style: PropTypes.object,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export const TableSelectCell = withStyles(styles, { name: 'TableSelectCell' })(TableSelectCellBase);
