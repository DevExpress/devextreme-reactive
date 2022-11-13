import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export const Container = ({
  clientOffset, style, className, children,
  ...restProps
}) => (
  <ul
    className={classNames('list-group', className)}
    style={{
      cursor: 'move',
      position: 'fixed',
      zIndex: 1000,
      left: 0,
      top: 0,
      display: 'inline-block',
      transform: `translate(calc(${clientOffset.x}px - 50%), calc(${clientOffset.y}px - 50%))`,
      msTransform: `translateX(${clientOffset.x}px) translateX(-50%) translateY(${clientOffset.y}px) translateY(-50%)`,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </ul>
);

Container.propTypes = {
  clientOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

Container.defaultProps = {
  style: null,
  className: undefined,
  children: undefined,
};

export const Column = React.memo(({ column, className, ...restProps }) => (
  <li
    className={classNames('list-group-item', className)}
    {...restProps}
  >
    {column.title}
  </li>
));

Column.propTypes = {
  column: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Column.defaultProps = {
  className: undefined,
};
