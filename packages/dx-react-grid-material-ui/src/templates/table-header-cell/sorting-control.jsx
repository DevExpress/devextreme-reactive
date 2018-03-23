import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

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

const onClick = (e, sort) => {
  const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
  const isMouseClick = e.keyCode === undefined;

  const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
  const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
    ? null
    : undefined;
  const keepOther = e.shiftKey || cancelSortingRelatedKey;

  e.preventDefault();
  sort({ direction, keepOther });
};

const SortingControlBase = ({
  align, sortingDirection, title, sort, classes, getMessage, disabled, ...restProps
}) => (
  <div {...restProps}>
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
        direction={sortingDirection === null ? undefined : sortingDirection}
        onClick={e => onClick(e, sort)}
        disabled={disabled}
        classes={{
          root: classes.sortLabelRoot,
          active: classes.sortLabelActive,
        }}
      >
        {title}
      </TableSortLabel>
    </Tooltip>
  </div>
);

SortingControlBase.propTypes = {
  align: PropTypes.string,
  sortingDirection: PropTypes.oneOf(['asc', 'desc', null]),
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  sort: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SortingControlBase.defaultProps = {
  sortingDirection: undefined,
  disabled: false,
  align: 'left',
};

export const SortingControl = withStyles(styles, { name: 'SortingControl' })(SortingControlBase);
