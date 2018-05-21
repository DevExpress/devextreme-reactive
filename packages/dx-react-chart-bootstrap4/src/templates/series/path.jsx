import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Path extends React.PureComponent {
  render() {
    const {
      x, y, className, pointComponent, pointStyle, coordinates, path, ...restProps
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        className={classNames('dx-c-bs4-fill-none', className)}
        d={path(coordinates)}
        {...restProps}
      />
    );
  }
}

Path.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  coordinates: PropTypes.array.isRequired,
  path: PropTypes.func.isRequired,
  pointComponent: PropTypes.any,
  pointStyle: PropTypes.any,
};

Path.defaultProps = {
  className: undefined,
  pointComponent: undefined,
  pointStyle: undefined,
};
