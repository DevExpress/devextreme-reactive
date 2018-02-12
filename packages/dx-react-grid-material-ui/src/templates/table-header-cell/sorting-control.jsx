import * as React from 'react';
import * as PropTypes from 'prop-types';
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
  align, sortingDirection, columnTitle, onClick, classes, getMessage, disabled,
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
      disabled={disabled}
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
  disabled: PropTypes.bool,
};

SortingControlBase.defaultProps = {
  sortingDirection: null,
  disabled: false,
};

export const SortingControl = withStyles(styles, { name: 'SortingControl' })(SortingControlBase);
