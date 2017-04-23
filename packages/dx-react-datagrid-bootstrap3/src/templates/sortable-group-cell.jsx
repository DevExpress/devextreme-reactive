import React from 'react';
import PropTypes from 'prop-types';

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
  direction: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  toggleSorting: PropTypes.func.isRequired,
};
