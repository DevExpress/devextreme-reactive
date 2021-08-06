import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  toggleCell: {
    textAlign: 'center',
    textOverflow: 'initial',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
  },
  toggleCellButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    padding: theme.spacing(1),
  },
});

const TableDetailToggleCellBase = ({
  style, expanded, classes, onToggle,
  tableColumn, tableRow, row,
  className, refObject,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };
  return (
    <TableCell
      className={classNames(classes.toggleCell, className)}
      style={style}
      ref={refObject}
      {...restProps}
    >
      <IconButton
        className={classes.toggleCellButton}
        onClick={handleClick}
      >
        {
          expanded
            ? <ExpandLess />
            : <ExpandMore />
        }
      </IconButton>
    </TableCell>
  );
};

TableDetailToggleCellBase.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
  row: PropTypes.any,
  refObject: PropTypes.object,
};

TableDetailToggleCellBase.defaultProps = {
  style: null,
  expanded: false,
  onToggle: () => {},
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  refObject: undefined,
};

export const TableDetailToggleCell = withStyles(styles, { name: 'TableDetailToggleCell' })(TableDetailToggleCellBase);
