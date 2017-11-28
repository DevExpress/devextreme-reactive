import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ clientOffset, children }) => (
  <ul
    className="list-group"
    style={{
      cursor: 'move',
      position: 'fixed',
      zIndex: 1000,
      left: 0,
      top: 0,
      display: 'inline-block',
      transform: `translate(calc(${clientOffset.x}px - 50%), calc(${clientOffset.y}px - 50%))`,
    }}
  >
    {children}
  </ul>
);

Container.propTypes = {
  clientOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Container.defaultProps = {
  children: undefined,
};

export const Column = ({ column }) => (
  <li className="list-group-item">{column.title}</li>
);

Column.propTypes = {
  column: PropTypes.object.isRequired,
};
