import * as React from 'react';
import * as PropTypes from 'prop-types';

import { SortingIndicator } from '../parts/sorting-indicator';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const SortingControl = ({
  align, sortingDirection, columnTitle, onClick, disabled,
}) => (
  <span
    className={sortingDirection ? 'text-primary' : ''}
    tabIndex={disabled ? -1 : 0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
    onMouseDown={handleMouseDown}
    onBlur={handleBlur}
    onKeyDown={onClick}
    onClick={onClick}
    style={{
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '100%',
      ...!disabled ? { cursor: 'pointer' } : null,
      ...(align === 'right' ? { flexDirection: 'row-reverse' } : null),
    }}
  >
    <span
      key="title"
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {columnTitle}
    </span>
    {sortingDirection && (
      <SortingIndicator
        key="indicator"
        direction={sortingDirection}
        style={{
          visibility: sortingDirection ? 'visible' : 'hidden',
          margin: '0 5px',
          display: 'inline-block',
        }}
      />
    )}
  </span>
);

SortingControl.propTypes = {
  align: PropTypes.string.isRequired,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  columnTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SortingControl.defaultProps = {
  sortingDirection: null,
  disabled: false,
};
