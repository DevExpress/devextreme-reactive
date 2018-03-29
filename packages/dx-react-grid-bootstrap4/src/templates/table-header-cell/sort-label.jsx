import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortingIndicator } from '../parts/sorting-indicator';
import './sort-label.css';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

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
  direction, disabled, onSort, className, ...restProps
}) => ({
  className: classNames({
    'dx-rg-bs4-sort-label': true,
    'dx-rg-bs4-cursor-pointer': true,
    'text-primary': direction,
  }, className),
  tabIndex: disabled ? -1 : 0,
  onMouseDown: handleMouseDown,
  onBlur: handleBlur,
  onKeyDown: e => onClick(e, onSort),
  onClick: e => onClick(e, onSort),
  ...restProps,
});

export const SortLabel = ({
  align, direction, title, disabled, className, onSort, getMessage, ...restProps
}) => {
  const props = getProps({
    direction, disabled, onSort, className, ...restProps,
  });
  return (align === 'right' ? (
    <span {...props}>
      <SortingIndicator
        direction={direction}
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
  className: PropTypes.string,
  getMessage: PropTypes.func,
};

SortLabel.defaultProps = {
  direction: null,
  disabled: false,
  className: undefined,
  align: 'left',
  getMessage: () => {},
};
