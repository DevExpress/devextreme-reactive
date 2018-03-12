import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SortingIndicator } from '../parts/sorting-indicator';
import './sorting-control.css';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

const getProps = (sortingDirection, disabled, onClick) => ({
  className: classNames({
    'dx-rg-bs4-sorting-control': true,
    'text-primary': sortingDirection,
  }),
  tabIndex: disabled ? -1 : 0,
  onMouseDown: handleMouseDown,
  onBlur: handleBlur,
  onKeyDown: onClick,
});

export const SortingControl = ({
  align, sortingDirection, columnTitle, disabled, onClick,
}) => {
  const props = getProps(sortingDirection, disabled, onClick);
  return (align === 'right' ? (
    <span {...props}>
      <SortingIndicator
        direction={sortingDirection}
      />
      &nbsp;
      {columnTitle}
    </span>
  ) : (
    <span {...props}>
      {columnTitle}
      &nbsp;
      <SortingIndicator
        direction={sortingDirection}
      />
    </span>
  ));
};

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
