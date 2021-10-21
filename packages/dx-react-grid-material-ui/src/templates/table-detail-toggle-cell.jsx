import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@mui/material/TableCell';
import withStyles from '@mui/styles/withStyles';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';

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
  className, forwardedRef,
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
      ref={forwardedRef}
      {...restProps}
    >
      <IconButton className={classes.toggleCellButton} onClick={handleClick} size="large">
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
  forwardedRef: PropTypes.object,
};

TableDetailToggleCellBase.defaultProps = {
  style: null,
  expanded: false,
  onToggle: () => {},
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  forwardedRef: undefined,
};

export const TableDetailToggleCell = withStyles(styles, { name: 'TableDetailToggleCell' })(TableDetailToggleCellBase);
