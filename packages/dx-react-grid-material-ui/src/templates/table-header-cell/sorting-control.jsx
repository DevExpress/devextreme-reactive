import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const styles = theme => ({
  root: {
    flexDirection: 'inherit',
  },
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

const onClick = (e, onSort) => {
  const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
  const isMouseClick = e.keyCode === undefined;

  const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
  const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
    ? null
    : undefined;
  const keepOther = e.shiftKey || cancelSortingRelatedKey;

  e.preventDefault();
  onSort({ direction, keepOther });
};

const SortingControlBase = ({
  align, direction, title, onSort,
  classes, getMessage, disabled, className, ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    <Tooltip
      title={getMessage('sortingHint')}
      placement={align === 'right' ? 'bottom-end' : 'bottom-start'}
      enterDelay={300}
      classes={{
        root: classes.tooltipRoot,
      }}
    >
      <TableSortLabel
        active={!!direction}
        direction={direction === null ? undefined : direction}
        onClick={e => onClick(e, onSort)}
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
  direction: PropTypes.oneOf(['asc', 'desc', null]),
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

SortingControlBase.defaultProps = {
  direction: undefined,
  disabled: false,
  align: 'left',
  className: null,
};

export const SortingControl = withStyles(styles, { name: 'SortingControl' })(SortingControlBase);
