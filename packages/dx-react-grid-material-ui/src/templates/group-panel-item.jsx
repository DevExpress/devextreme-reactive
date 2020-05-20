import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const styles = theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  withoutIcon: {
    paddingRight: '13px',
    paddingLeft: '13px',
  },
  draftCell: {
    opacity: 0.3,
  },
});

const label = (showSortingControls, sortingEnabled, sortingDirection, column, hovered) => {
  const title = column.title || column.name;
  return showSortingControls
    ? (
      <TableSortLabel
        active={!!sortingDirection}
        direction={sortingDirection === null ? undefined : sortingDirection}
        disabled={!sortingEnabled}
        hideSortIcon={!hovered}
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
  const [hovered, setHovered] = React.useState(false);
  const chipClassNames = classNames({
    [classes.button]: true,
    [classes.withoutIcon]: !showSortingControls || (!hovered && sortingDirection === null),
    [classes.draftCell]: draft,
  }, className);
  const onClick = (e) => {
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
      label={label(showSortingControls, sortingEnabled, sortingDirection, column, hovered)}
      className={chipClassNames}
      {...showGroupingControls
        ? { onDelete: groupingEnabled ? onGroup : null }
        : null}
      {...showSortingControls
        ? {
          onClick: sortingEnabled ? onClick : null,
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        }
        : null}
      {...restProps}
    />
  );
};

GroupPanelItemBase.propTypes = {
  item: PropTypes.shape({
    column: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
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
