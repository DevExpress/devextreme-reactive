import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableSortLabel, Chip } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

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
        tabIndex={-1}
      >
        {title}
      </TableSortLabel>
    )
    : title;
};

const GroupPanelItemBase = ({
  column,
  groupByColumn, allowUngroupingByClick,
  allowSorting, sortingDirection, changeSortingDirection,
  classes, draft,
}) => {
  const chipClassNames = classNames({
    [classes.button]: true,
    [classes.draftCell]: draft,
  });
  const onClick = (e) => {
    if (!allowSorting) return;
    const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
    const isMouseClick = e.keyCode === undefined;
    const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
    const cancel = (isMouseClick && cancelSortingRelatedKey)
      || (isActionKeyDown && cancelSortingRelatedKey);

    changeSortingDirection({
      keepOther: cancelSortingRelatedKey,
      cancel,
      columnName: column.name,
    });
  };

  return (<Chip
    label={label(allowSorting, sortingDirection, column)}
    className={chipClassNames}
    {...allowUngroupingByClick
      ? { onRequestDelete: () => groupByColumn({ columnName: column.name }) }
      : null}
    onClick={onClick}
  />);
};

GroupPanelItemBase.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  draft: PropTypes.string,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  changeSortingDirection: PropTypes.func,
  groupByColumn: PropTypes.func,
  allowUngroupingByClick: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

GroupPanelItemBase.defaultProps = {
  draft: undefined,
  allowSorting: false,
  sortingDirection: undefined,
  changeSortingDirection: undefined,
  groupByColumn: undefined,
  allowUngroupingByClick: false,
};

export const GroupPanelItem = withStyles(styles, { name: 'GroupPanelItem' })(GroupPanelItemBase);
