import React from 'react';

export const SortableCell = ({ style, direction, children }) => {
  const iconName = `glyphicon-arrow-${direction === 'asc' ? 'down' : 'up'}`;
  return (
    <th
      style={style}
    >
      <span>
        {children}
      </span>
      <i
        className={`glyphicon ${iconName}`}
        style={{
          margin: '0 5px',
          visibility: direction ? 'visible' : 'hidden',
        }}
      />
    </th>
  );
};

SortableCell.propTypes = {
  direction: React.PropTypes.any.isRequired,
  children: React.PropTypes.any.isRequired,
};
