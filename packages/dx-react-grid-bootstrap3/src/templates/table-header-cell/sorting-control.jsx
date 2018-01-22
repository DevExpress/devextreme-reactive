import React from 'react';
import PropTypes from 'prop-types';

import { SortingIndicator } from '../parts/sorting-indicator';

const handleMouseDown = (e) => { e.currentTarget.style.outline = 'none'; };
const handleBlur = (e) => { e.currentTarget.style.outline = ''; };

export const SortingControl = ({
  align, sortingDirection, columnTitle, onClick,
}) =>
  (align === 'right' ? (
    <span
      className={sortingDirection ? 'text-primary' : ''}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onKeyDown={onClick}
    >
      <SortingIndicator
        direction={sortingDirection}
        style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
      />
      &nbsp;
      {columnTitle}
    </span>
  ) : (
    <span
      className={sortingDirection ? 'text-primary' : ''}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onKeyDown={onClick}
    >
      {columnTitle}
      &nbsp;
      <SortingIndicator
        direction={sortingDirection}
        style={{ visibility: sortingDirection ? 'visible' : 'hidden' }}
      />
    </span>
  ));

SortingControl.propTypes = {
  align: PropTypes.string.isRequired,
  sortingDirection: PropTypes.oneOf(['asc', 'desc']),
  columnTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

SortingControl.defaultProps = {
  sortingDirection: null,
};
