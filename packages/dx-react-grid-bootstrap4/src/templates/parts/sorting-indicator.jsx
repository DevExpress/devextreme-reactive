import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const SortingIndicator = ({ direction, className }) => (
  <span
    className={classNames({
      'oi dx-g-bs4-sorting-indicator mx-2': true,
      'oi-arrow-thick-bottom': direction === 'desc',
      'oi-arrow-thick-top': direction !== 'desc',
      invisible: !direction,
    }, className)}
  />
);

SortingIndicator.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']),
  className: PropTypes.string,
};

SortingIndicator.defaultProps = {
  direction: null,
  className: undefined,
};
