import React from 'react';

export const SortableGroupCell = ({ direction, children, toggleSorting }) => {
  const iconName = `glyphicon-arrow-${direction === 'asc' ? 'down' : 'up'}`;
  return (
    <span onClick={e => toggleSorting({ keepOther: e.shiftKey })}>
      {children}
      {
        direction
        ? (
          <i
            className={`glyphicon ${iconName}`}
            style={{
              marginLeft: '8px',
            }}
          />
        )
        : null
      }
    </span>
  );
};

SortableGroupCell.propTypes = {
  direction: React.PropTypes.any.isRequired,
  children: React.PropTypes.any.isRequired,
  toggleSorting: React.PropTypes.func.isRequired,
};
