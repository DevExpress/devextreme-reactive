import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortingIndicator } from '../parts/sorting-indicator';
import './sorting-control.css';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

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
  sortingDirection, disabled, sort, className, ...restProps
}) => ({
  className: classNames({
    'dx-rg-bs4-sorting-control': true,
    'text-primary': sortingDirection,
  }, className),
  tabIndex: disabled ? -1 : 0,
  onMouseDown: handleMouseDown,
  onBlur: handleBlur,
  onKeyDown: e => onClick(e, sort),
  onClick: e => onClick(e, sort),
  ...restProps,
});

export const SortingControl = ({
  align, sortingDirection, title, disabled, className, sort, ...restProps
}) => {
  const props = getProps({
    sortingDirection, disabled, sort, className, ...restProps,
  });
  return (align === 'right' ? (
    <span {...props}>
      <SortingIndicator
        direction={sortingDirection}
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
  className: PropTypes.string,
};

SortingControl.defaultProps = {
  sortingDirection: null,
  disabled: false,
  className: undefined,
  align: 'left',
};
