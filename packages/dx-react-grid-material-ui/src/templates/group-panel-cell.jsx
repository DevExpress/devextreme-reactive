import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  TableSortLabel,
} from 'material-ui';

import Close from 'material-ui-icons/Close';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('GroupPanelCell', theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
}));

const GroupPanelCellBase = ({
  column,
  groupByColumn,
  allowSorting, sortingDirection, changeSortingDirection,
  classes,
}) => (
  <Button
    raised
    className={classes.button}
    component="span"
  >
    <span
      onClick={(e) => {
        if (!allowSorting) return;
        const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
        changeSortingDirection({
          keepOther: e.shiftKey || cancelSortingRelatedKey,
          cancel: cancelSortingRelatedKey,
        });
      }}
    >
      <TableSortLabel
        active={allowSorting && !!sortingDirection}
        direction={sortingDirection}
      >
        {column.title || column.name}
      </TableSortLabel>
    </span>
    &nbsp;
    <Close
      onClick={() => groupByColumn({ columnName: column.name })}
    />
  </Button>
);

GroupPanelCellBase.defaultProps = {
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  allowGrouping: false,
  groupByColumn: undefined,
};

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

export const GroupPanelCell = withStyles(styleSheet)(GroupPanelCellBase);
