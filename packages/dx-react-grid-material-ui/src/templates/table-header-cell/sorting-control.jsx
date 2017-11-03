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
  align, sortingDirection, columnTitle, onClick, classes, text,
}) => (
  <Tooltip
    title={text}
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
  text: PropTypes.string,
};

SortingControlBase.defaultProps = {
  sortingDirection: null,
  text: 'Sort',
};

export const SortingControl = withStyles(styles, { name: 'SortingControl' })(SortingControlBase);
