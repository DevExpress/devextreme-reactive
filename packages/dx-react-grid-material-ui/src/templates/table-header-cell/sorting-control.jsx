import React from 'react';
import PropTypes from 'prop-types';
import { TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  tooltipRoot: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sortLabelRoot: {
    height: theme.spacing.unit * 3,
  },
  sortLabelActive: {
    color: 'inherit',
  },
});

const SortingControlBase = ({
  align, sortingDirection, columnTitle, onClick, classes, getMessage, sortingEnabled,
}) => (
  <Tooltip
    title={getMessage('sortingHint')}
    placement={align === 'right' ? 'bottom-end' : 'bottom-start'}
    enterDelay={300}
    classes={{
      root: classes.tooltipRoot,
    }}
  >
    <TableSortLabel
      active={!!sortingDirection}
      direction={sortingDirection}
      onClick={onClick}
      disabled={!sortingEnabled}
      classes={{
        root: classes.sortLabelRoot,
        active: classes.sortLabelActive,
      }}
    >
      {columnTitle}
    </TableSortLabel>
  </Tooltip>
);

SortingControlBase.propTypes = {
  align: PropTypes.string.isRequired,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  columnTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  sortingEnabled: PropTypes.bool,
};

SortingControlBase.defaultProps = {
  sortingDirection: null,
  sortingEnabled: true,
};

export const SortingControl = withStyles(styles, { name: 'SortingControl' })(SortingControlBase);
