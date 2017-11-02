import React from 'react';
import PropTypes from 'prop-types';

import { TableSortLabel, Tooltip } from 'material-ui';
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
  align, sortingDirection, columnTitle, handleClick, classes,
}) => (
  <Tooltip
    title="Sort"
    placement={align === 'right' ? 'bottom-end' : 'bottom-start'}
    enterDelay={300}
    classes={{
      root: classes.tooltipRoot,
    }}
  >
    <TableSortLabel
      active={!!sortingDirection}
      direction={sortingDirection}
      onClick={handleClick}
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
  handleClick: PropTypes.func.isRequired,
};

SortingControlBase.defaultProps = {
  sortingDirection: null,
};

export const SortingControl = withStyles(styles, { name: 'SortingControl' })(SortingControlBase);
