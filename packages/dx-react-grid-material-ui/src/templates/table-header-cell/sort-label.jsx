import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const PREFIX = 'ResizingControl';
export const classes = {
  root: `${PREFIX}-root`,
  tooltipRoot: `${PREFIX}-tooltipRoot`,
  sortLabelRoot: `${PREFIX}-sortLabelRoot`,
  sortLabelRight: `${PREFIX}-sortLabelRight`,
  sortLabelActive: `${PREFIX}-sortLabelActive`,
};
const StyledDiv = styled('div')(() => ({
  [`&.${classes.root}`]: {
    width: '100%',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
  },
  [`& .${classes.sortLabelRoot}`]: {
    maxWidth: '100%',
  },
  [`& .${classes.sortLabelRight}`]: {
    flexDirection: 'row-reverse',
  },
  [`& .${classes.sortLabelActive}`]: {
    color: 'inherit',
  },
  [`& .${classes.tooltipRoot}`]: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

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

export const SortLabel = ({
  column, align, direction, children, onSort,
  getMessage, disabled, className, ...restProps
}) => (
  <StyledDiv
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
  </StyledDiv>
);

SortLabel.propTypes = {
  column: PropTypes.object,
  align: PropTypes.string,
  direction: PropTypes.oneOf(['asc', 'desc', null]),
  children: PropTypes.node,
  onSort: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

SortLabel.defaultProps = {
  column: undefined,
  direction: undefined,
  disabled: false,
  align: 'left',
  className: null,
  children: undefined,
};
