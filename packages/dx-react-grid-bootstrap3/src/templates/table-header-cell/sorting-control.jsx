import React from 'react';
import PropTypes from 'prop-types';

import { SortingIndicator } from '../parts/sorting-indicator';

export const SortingControl = ({ align, sortingDirection, columnTitle }) =>
  (align === 'right' ? (
    <span
      className={sortingDirection ? 'text-primary' : ''}
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
};

SortingControl.defaultProps = {
  sortingDirection: null,
};
