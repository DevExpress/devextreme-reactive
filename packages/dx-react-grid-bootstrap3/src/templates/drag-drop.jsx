import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Container = ({
  clientOffset, columns, columnTemplate,
  style, className, ...restProps
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
      ...style,
    }}
    {...restProps}
  >
    {columns
      .map(column => React.cloneElement(
        columnTemplate({ column }),
        { key: column.name },
      ))}
  </ul>
);

Container.propTypes = {
  clientOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  columns: PropTypes.array.isRequired,
  columnTemplate: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

Container.defaultProps = {
  style: {},
  className: undefined,
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
