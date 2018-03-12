import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableSortLabel } from 'material-ui/Table';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,
  },
  draftCell: {
    opacity: 0.3,
  },
});

const label = (showSortingControls, sortingEnabled, sortingDirection, column) => {
  const title = column.title || column.name;
  return showSortingControls
    ? (
      <TableSortLabel
        active={!!sortingDirection}
        direction={sortingDirection === null ? undefined : sortingDirection}
        disabled={!sortingEnabled}
        tabIndex={-1}
      >
        {title}
      </TableSortLabel>
    )
    : title;
};

const GroupPanelItemBase = ({
  item: { column, draft },
  onGroup, showGroupingControls,
  showSortingControls, sortingDirection, onSort,
  sortingEnabled, groupingEnabled,
  classes, className,
  ...restProps
}) => {
  const chipClassNames = classNames({
    [classes.button]: true,
    [classes.draftCell]: draft,
  }, className);
  const onClick = (e) => {
    if (!showSortingControls || !sortingEnabled) return;
    const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
    const isMouseClick = e.keyCode === undefined;
    const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
    const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
      ? null
      : undefined;

    onSort({
      direction,
      keepOther: cancelSortingRelatedKey,
    });
  };

  return (
    <Chip
      label={label(showSortingControls, sortingEnabled, sortingDirection, column)}
      className={chipClassNames}
      {...showGroupingControls
        ? { onDelete: groupingEnabled ? onGroup : () => {} }
        : null}
      onClick={onClick}
      {...restProps}
    />
  );
};

GroupPanelItemBase.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    draft: PropTypes.bool,
  }).isRequired,
  showSortingControls: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  onSort: PropTypes.func,
  onGroup: PropTypes.func,
  showGroupingControls: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  sortingEnabled: PropTypes.bool,
  groupingEnabled: PropTypes.bool,
};

GroupPanelItemBase.defaultProps = {
  showSortingControls: false,
  sortingEnabled: false,
  sortingDirection: undefined,
  onSort: undefined,
  onGroup: undefined,
  showGroupingControls: false,
  groupingEnabled: false,
  className: undefined,
};

export const GroupPanelItem = withStyles(styles, { name: 'GroupPanelItem' })(GroupPanelItemBase);
