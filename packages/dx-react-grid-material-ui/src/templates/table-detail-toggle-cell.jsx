import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  toggleCell: {
    textAlign: 'center',
    textOverflow: 'initial',
    paddingTop: 0,
    paddingBottom: 0,
  },
  toggleCellButton: {
    verticalAlign: 'middle',
    display: 'inline-block',
    height: theme.spacing.unit * 6,
    width: theme.spacing.unit * 6,
    marginLeft: -theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
  },
});

const TableDetailToggleCellBase = ({
  style, expanded, classes, toggleExpanded,
}) => {
  const handleClick = () => {
    toggleExpanded();
  };
  return (
    <TableCell
      className={classes.toggleCell}
      style={style}
    >
      <IconButton
        className={classes.toggleCellButton}
        onClick={handleClick}
      >
        {
          expanded
            ? <ExpandMore />
            : <ChevronRight />
        }
      </IconButton>
    </TableCell>
  );
};

TableDetailToggleCellBase.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  toggleExpanded: PropTypes.func,
};

TableDetailToggleCellBase.defaultProps = {
  style: null,
  expanded: false,
  toggleExpanded: () => {},
};

export const TableDetailToggleCell = withStyles(styles, { name: 'TableDetailToggleCell' })(TableDetailToggleCellBase);
