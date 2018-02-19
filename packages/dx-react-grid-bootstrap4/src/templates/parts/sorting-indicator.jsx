import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './sorting-indicator.css';

export const SortingIndicator = ({ direction }) => (
  <span
    className={classNames({
      'oi dx-rg-bs4-sorting-indicator': true,
      'oi-arrow-thick-bottom': direction === 'desc',
      'oi-arrow-thick-top': direction !== 'desc',
      invisible: !direction,
    })}
  />
);

SortingIndicator.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']),
};

SortingIndicator.defaultProps = {
  direction: null,
};
