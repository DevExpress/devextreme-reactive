import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { TableSortLabel, Chip, styled } from '@mui/material';

const PREFIX = 'GroupPanelItem';
export const classes = {
  button: `${PREFIX}-button`,
  withoutIcon: `${PREFIX}-withoutIcon`,
  draftCell: `${PREFIX}-draftCell`,
};

const StyledChip = styled(Chip)(({ theme }) => ({
  [`&.${classes.button}`]: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  [`&.${classes.withoutIcon}`]: {
    paddingRight: '13px',
    paddingLeft: '13px',
  },
  [`&.${classes.draftCell}`]: {
    opacity: 0.3,
  },
}));

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

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

export const GroupPanelItem = ({
  item: { column, draft },
  onGroup, showGroupingControls,
  showSortingControls, sortingDirection, onSort,
  sortingEnabled, groupingEnabled,
  className, forwardedRef,
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
    <StyledChip
      ref={forwardedRef}
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

GroupPanelItem.propTypes = {
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
  className: PropTypes.string,
  sortingEnabled: PropTypes.bool,
  groupingEnabled: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelItem.defaultProps = {
  showSortingControls: false,
  sortingEnabled: false,
  sortingDirection: undefined,
  onSort: undefined,
  onGroup: undefined,
  showGroupingControls: false,
  groupingEnabled: false,
  className: undefined,
  forwardedRef: undefined,
};
