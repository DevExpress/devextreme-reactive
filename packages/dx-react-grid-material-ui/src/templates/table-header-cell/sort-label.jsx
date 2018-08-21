import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const styles = () => ({
  root: {
    width: '100%',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  },
  tooltipRoot: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sortLabelRoot: {
    maxWidth: '100%',
  },
  sortLabelRight: {
    flexDirection: 'row-reverse',
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

const SortLabelBase = ({
  column, align, direction, children, onSort,
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
        tooltip: classes.tooltipRoot,
      }}
    >
      <TableSortLabel
        active={!!direction}
        direction={direction === null ? undefined : direction}
        onClick={e => onClick(e, onSort)}
        disabled={disabled}
        classes={{
          root: classNames({
            [classes.sortLabelRoot]: true,
            [classes.sortLabelRight]: align === 'right',
          }),
          active: classes.sortLabelActive,
        }}
      >
        {children}
      </TableSortLabel>
    </Tooltip>
  </div>
);

SortLabelBase.propTypes = {
  column: PropTypes.object,
  align: PropTypes.string,
  direction: PropTypes.oneOf(['asc', 'desc', null]),
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

SortLabelBase.defaultProps = {
  column: undefined,
  direction: undefined,
  disabled: false,
  align: 'left',
  className: null,
  children: undefined,
};

export const SortLabel = withStyles(styles, { name: 'SortLabel' })(SortLabelBase);
