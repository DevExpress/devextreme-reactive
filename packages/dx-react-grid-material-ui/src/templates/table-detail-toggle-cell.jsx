import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import ChevronRight from 'material-ui-icons/ChevronRight';
import ExpandMore from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  toggleCell: {
    textAlign: 'center',
    cursor: 'pointer',
    textOverflow: 'initial',
  },
  toggleCellIcon: {
    verticalAlign: 'middle',
    display: 'inline-block',
    height: theme.spacing.unit * 3,
    marginLeft: '-6px',
  },
});

const TableDetailToggleCellBase = ({
  style, expanded, classes, toggleExpanded,
}) => (
  <TableCell
    className={classes.toggleCell}
    style={style}
    onClick={(e) => {
      e.stopPropagation();
      toggleExpanded();
    }}
  >
    <span className={classes.toggleCellIcon}>
      {
        expanded
          ? <ExpandMore />
          : <ChevronRight />
      }
    </span>
  </TableCell>
);

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
