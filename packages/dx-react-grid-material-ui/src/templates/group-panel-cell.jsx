import React from 'react';
import PropTypes from 'prop-types';

import { TableSortLabel, Chip } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('GroupPanelCell', theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: '12px',
  },
}));

const label = (allowSorting, sortingDirection, column) => (
  <TableSortLabel
    active={allowSorting && !!sortingDirection}
    direction={sortingDirection}
  >
    {column.title || column.name}
  </TableSortLabel>
);

const GroupPanelCellBase = ({
  column,
  groupByColumn,
  allowSorting, sortingDirection, changeSortingDirection,
  classes,
}) => (
  <Chip
    label={label(allowSorting, sortingDirection, column)}
    className={classes.button}
    onRequestDelete={() => groupByColumn({ columnName: column.name })}
    onClick={(e) => {
      if (!allowSorting) return;
      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      changeSortingDirection({
        keepOther: e.shiftKey || cancelSortingRelatedKey,
        cancel: cancelSortingRelatedKey,
        columnName: column.name,
      });
    }}
  />
);

GroupPanelCellBase.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

GroupPanelCellBase.defaultProps = {
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
};

export const GroupPanelCell = withStyles(styleSheet)(GroupPanelCellBase);
