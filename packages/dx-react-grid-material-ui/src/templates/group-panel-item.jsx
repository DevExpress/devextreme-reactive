import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableSortLabel, Chip } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: '12px',
  },
  draftCell: {
    opacity: 0.3,
  },
});

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


const GroupPanelItemBase = ({
  column, draft,
  groupByColumn, allowUngroupingByClick,
  allowSorting, sortingDirection, changeSortingDirection,
  classes,
}) => {
  const chipClassNames = classNames(
    {
      [classes.button]: true,
      [classes.draftCell]: draft,
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

GroupPanelItemBase.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  draft: PropTypes.bool,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
  allowUngroupingByClick: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

GroupPanelItemBase.defaultProps = {
  draft: false,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  groupByColumn: undefined,
  allowUngroupingByClick: false,
};

export const GroupPanelItem = withStyles(styles, { name: 'GroupPanelItem' })(GroupPanelItemBase);
