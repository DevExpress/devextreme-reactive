import React from 'react';
import PropTypes from 'prop-types';

import { SortingIndicator } from '../parts/sorting-indicator';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

const getProps = (sortingDirection, onClick) => ({
  className: sortingDirection ? 'text-primary' : '',
  tabIndex: 0,
  onMouseDown: handleMouseDown,
  onBlur: handleBlur,
  onKeyDown: onClick,
});

export const SortingControl = ({
  align, sortingDirection, columnTitle, onClick,
}) => {
  const props = getProps(sortingDirection, onClick);
  return (align === 'right' ? (
    <span {...props}>
      <SortingIndicator
        direction={sortingDirection}
        style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
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
        style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
      />
    </span>
  ));
};

SortingControl.propTypes = {
  align: PropTypes.string.isRequired,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  columnTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

SortingControl.defaultProps = {
  sortingDirection: null,
};
