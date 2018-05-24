import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Area extends React.PureComponent {
  render() {
    const {
      x, y, className, pointComponent, pointStyle, coordinates, path, themeColor, ...restProps
    } = this.props;
    return (
      <path
        fill={themeColor}
        transform={`translate(${x} ${y})`}
        className={classNames('dx-c-bs4-series-opacity', className)}
        d={path(coordinates)}
        {...restProps}
      />
    );
  }
}

Area.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  coordinates: PropTypes.array.isRequired,
  path: PropTypes.func.isRequired,
  pointComponent: PropTypes.any,
  pointStyle: PropTypes.any,
  themeColor: PropTypes.string,
};

Area.defaultProps = {
  className: undefined,
  pointComponent: undefined,
  pointStyle: undefined,
  themeColor: undefined,
};
