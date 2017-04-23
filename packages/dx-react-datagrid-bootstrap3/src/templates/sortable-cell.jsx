import React from 'react';
import PropTypes from 'prop-types';

export const SortableCell = ({ direction, children }) => {
  const iconName = `glyphicon-arrow-${direction === 'asc' ? 'down' : 'up'}`;
  return (
    <span>
      {children}
      <i
        className={`glyphicon ${iconName}`}
        style={{
          margin: '0 5px',
          visibility: direction ? 'visible' : 'hidden',
        }}
      />
    </span>
  );
};

SortableCell.propTypes = {
  direction: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};
