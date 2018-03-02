import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const Container = ({
  clientOffset, style, className, children,
  ...restProps
}) => (
  <ul
    className={classNames('list-group d-inline-block position-fixed dx-rg-bs4-drag-drop', className)}
    style={{
      transform: `translate(calc(${clientOffset.x}px - 50%), calc(${clientOffset.y}px - 50%))`,
      zIndex: 1000,
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Container.defaultProps = {
  style: {},
  className: undefined,
  children: undefined,
};

export const Column = ({ column, className, ...restProps }) => (
  <li
    className={classNames('list-group-item', className)}
    {...restProps}
  >
    {column.title}
  </li>
);

Column.propTypes = {
  column: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Column.defaultProps = {
  className: undefined,
};
