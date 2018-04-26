import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortingIndicator } from '../parts/sorting-indicator';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const SortingControl = ({
  align, sortingDirection, columnTitle, disabled, onClick,
}) => (
  <span
    className={classNames({
      'd-inline-flex flex-direction-row align-items-center mw-100': true,
      'dx-g-bs4-cursor-pointer': !disabled,
      'flex-row-reverse': align === 'right',
      'text-primary': sortingDirection,
    })}
    tabIndex={disabled ? -1 : 0}
    onMouseDown={handleMouseDown}
    onBlur={handleBlur}
    onKeyDown={onClick}
    onClick={onClick}
  >
    <span
      key="title"
      className="dx-g-bs4-sorting-control-text text-nowrap"
    >
      {columnTitle}
    </span>
    {sortingDirection && (
      <SortingIndicator
        key="indicator"
        direction={sortingDirection}
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
