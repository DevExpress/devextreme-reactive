import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SortingIndicator } from '../parts/sorting-indicator';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

const onClick = (e, onSort) => {
  const isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
  const isMouseClick = e.keyCode === undefined;
  if (!(isActionKeyDown || isMouseClick)) return;

  const cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
  const direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey
    ? null
    : undefined;
  const keepOther = e.shiftKey || cancelSortingRelatedKey;

  e.preventDefault();
  onSort({ direction, keepOther });
};

const getProps = ({
  direction, disabled, onSort, style, ...restProps
}) => ({
  className: direction ? 'text-primary' : '',
  tabIndex: disabled ? -1 : 0,
  onMouseDown: handleMouseDown,
  onBlur: handleBlur,
  onKeyDown: e => onClick(e, onSort),
  onClick: e => onClick(e, onSort),
  style: { ...style, cursor: 'pointer' },
  ...restProps,
});

export const SortLabel = ({
  align, direction, title, disabled, onSort, style, getMessage, ...restProps
}) => {
  const props = getProps({
    direction, disabled, onSort, style, ...restProps,
  });
  const sortingIndicatorStyle = {
    visibility: direction ? 'visible' : 'hidden',
  };
  return (align === 'right' ? (
    <span {...props}>
      <SortingIndicator
        direction={direction}
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
        direction={direction}
        style={sortingIndicatorStyle}
      />
    </span>
  ));
};

SortLabel.propTypes = {
  align: PropTypes.string,
  direction: PropTypes.oneOf(['asc', 'desc']),
  title: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  getMessage: PropTypes.func,
};

SortLabel.defaultProps = {
  direction: null,
  disabled: false,
  style: null,
  align: 'left',
  getMessage: () => {},
};
