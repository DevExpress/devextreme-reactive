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
  item: { column, draft },
  onGroup, allowUngroupingByClick,
  allowSorting, sortingDirection, onSort,
  classes, className,
  ...restProps
}) => {
  const chipClassNames = classNames({
    [classes.button]: true,
    [classes.draftCell]: draft,
  }, className);
  const onClick = (e) => {
    if (!allowSorting) return;
    const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
    const isMouseClick = e.keyCode === undefined;
    const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
    const cancel = (isMouseClick && cancelSortingRelatedKey)
      || (isActionKeyDown && cancelSortingRelatedKey);

    onSort({
      keepOther: cancelSortingRelatedKey,
      cancel,
      columnName: column.name,
    });
  };

  return (
    <Chip
      label={label(allowSorting, sortingDirection, column)}
      className={chipClassNames}
      {...allowUngroupingByClick
        ? { onRequestDelete: () => onGroup({ columnName: column.name }) }
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
    draft: PropTypes.string,
  }).isRequired,
  allowSorting: PropTypes.bool,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  onSort: PropTypes.func,
  onGroup: PropTypes.func,
  allowUngroupingByClick: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

GroupPanelItemBase.defaultProps = {
  allowSorting: false,
  sortingDirection: undefined,
  onSort: undefined,
  onGroup: undefined,
  allowUngroupingByClick: false,
  className: undefined,
};

export const GroupPanelItem = withStyles(styles, { name: 'GroupPanelItem' })(GroupPanelItemBase);
