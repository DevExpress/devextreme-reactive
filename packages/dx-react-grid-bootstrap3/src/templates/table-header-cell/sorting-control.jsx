import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SortingIndicator } from '../parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

const onClick = (e, sort) => {
  const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
  const isMouseClick = e.keyCode === undefined;
  if (!(isActionKeyDown || isMouseClick)) return;

  const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
  const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
    ? null
    : undefined;
  const keepOther = e.shiftKey || cancelSortingRelatedKey;

  e.preventDefault();
  sort({ direction, keepOther });
};

const getProps = ({
  sortingDirection, disabled, sort, style, ...restProps
}) => ({
  className: sortingDirection ? 'text-primary' : '',
  tabIndex: disabled ? -1 : 0,
  onMouseDown: handleMouseDown,
  onBlur: handleBlur,
  onKeyDown: e => onClick(e, sort),
  onClick: e => onClick(e, sort),
  style: { ...style, cursor: 'pointer' },
  ...restProps,
});

export const SortingControl = ({
  align, sortingDirection, title, disabled, sort, style, ...restProps
}) => {
  const props = getProps({
    sortingDirection, disabled, sort, style, ...restProps,
  });
  const sortingIndicatorStyle = {
    visibility: sortingDirection ? 'visible' : 'hidden',
  };
  return (align === 'right' ? (
    <span {...props}>
      <SortingIndicator
        direction={sortingDirection}
        style={sortingIndicatorStyle}
      />
      &nbsp;
      {title}
    </span>
  ) : (
    <span {...props}>
      {title}
      &nbsp;
      <SortingIndicator
        direction={sortingDirection}
        style={sortingIndicatorStyle}
      />
    </span>
  ));
};

SortingControl.propTypes = {
  align: PropTypes.string,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  title: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

SortingControl.defaultProps = {
  sortingDirection: null,
  disabled: false,
  style: null,
  align: 'left',
};
