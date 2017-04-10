import React from 'react';

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
  direction: React.PropTypes.any.isRequired,
  children: React.PropTypes.any.isRequired,
};
