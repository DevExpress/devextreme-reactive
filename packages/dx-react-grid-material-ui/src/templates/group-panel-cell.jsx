import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TableSortLabel, Chip } from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('GroupPanelCell', theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: '12px',
  },
  draftCell: {
    opacity: 0.3,
  },
}));

const label = (allowSorting, sortingDirection, column) => {
  const title = column.title || column.name;
  return allowSorting
    ? (
      <TableSortLabel
        active={!!sortingDirection}
        direction={sortingDirection}
      >
        {title}
      </TableSortLabel>
    )
    : title;
};


const GroupPanelCellBase = ({
  column,
  groupByColumn, allowUngroupingByClick,
  allowSorting, sortingDirection, changeSortingDirection,
  classes,
}) => {
  const chipClassNames = classNames(
    {
      [classes.button]: true,
      [classes.draftCell]: column.isDraft,
    },
  );

  return (<Chip
    label={label(allowSorting, sortingDirection, column)}
    className={chipClassNames}
    {...allowUngroupingByClick
      ? { onRequestDelete: () => groupByColumn({ columnName: column.name }) }
      : null}
    onClick={(e) => {
      if (!allowSorting) return;
      const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      changeSortingDirection({
        keepOther: e.shiftKey || cancelSortingRelatedKey,
        cancel: cancelSortingRelatedKey,
        columnName: column.name,
      });
    }}
  />);
};

GroupPanelCellBase.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
  allowUngroupingByClick: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

GroupPanelCellBase.defaultProps = {
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  groupByColumn: undefined,
  allowUngroupingByClick: false,
};

export const GroupPanelCell = withStyles(styleSheet)(GroupPanelCellBase);
