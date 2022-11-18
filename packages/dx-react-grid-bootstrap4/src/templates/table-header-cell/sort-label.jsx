import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { SortingIndicator } from '../parts/sorting-indicator';

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

export const SortLabel = ({
  align, direction, disabled, children, onSort, getMessage, className, column, ...restProps
}) => (
  <span
    className={classNames({
      'd-inline-flex flex-direction-row align-items-center mw-100 dx-g-bs4-user-select-none': true,
      'dx-g-bs4-cursor-pointer': !disabled,
      'flex-row-reverse': align === 'right',
      'text-primary': direction,
    }, className)}
    tabIndex={disabled ? -1 : 0}
    onMouseDown={handleMouseDown}
    onBlur={handleBlur}
    {...!disabled ? { onKeyDown: e => onClick(e, onSort), onClick: e => onClick(e, onSort) } : null}
    {...restProps}
  >
    {children}
    <SortingIndicator
      direction={direction}
      className={direction ? '' : 'dx-g-bs4-sort-indicator-invisible'}
    />
  </span>
);

SortLabel.propTypes = {
  column: PropTypes.object,
  align: PropTypes.string,
  direction: PropTypes.oneOf(['asc', 'desc']),
  children: PropTypes.node,
  onSort: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  getMessage: PropTypes.func,
};

SortLabel.defaultProps = {
  column: undefined,
  direction: null,
  disabled: false,
  children: undefined,
  className: undefined,
  align: 'left',
  getMessage: () => {},
};
