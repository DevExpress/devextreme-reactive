import * as React from 'react';
import PropTypes from 'prop-types';

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

export const SortLabel = ({
  align, direction, disabled, children, onSort, getMessage, className, column, style, ...restProps
}) => (
  <span
    className={direction ? 'text-primary' : ''}
    tabIndex={disabled ? -1 : 0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
    onMouseDown={handleMouseDown}
    onBlur={handleBlur}
    style={{
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '100%',
      userSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      ...!disabled ? { cursor: 'pointer' } : null,
      ...(align === 'right' ? { flexDirection: 'row-reverse' } : null),
      ...style,
    }}
    {...!disabled ? { onKeyDown: e => onClick(e, onSort), onClick: e => onClick(e, onSort) } : null}
    {...restProps}
  >
    {children}
    <SortingIndicator
      key="indicator"
      direction={direction}
      style={{
        opacity: direction ? '1' : '0',
        margin: '0 5px',
        display: 'inline-block',
      }}
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
  style: PropTypes.object,
};

SortLabel.defaultProps = {
  column: undefined,
  direction: null,
  disabled: false,
  children: undefined,
  className: undefined,
  align: 'left',
  getMessage: () => {},
  style: null,
};
