import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Area extends React.PureComponent {
  render() {
    const {
      className, pointComponent, pointStyle, coordinates, path, color, ...restProps
    } = this.props;
    return (
      <path
        fill={color}
        className={classNames('dx-c-bs4-series-opacity', className)}
        d={path(coordinates)}
        {...restProps}
      />
    );
  }
}

Area.propTypes = {
  className: PropTypes.string,
  coordinates: PropTypes.array.isRequired,
  path: PropTypes.func.isRequired,
  pointComponent: PropTypes.any,
  pointStyle: PropTypes.any,
  color: PropTypes.string,
};

Area.defaultProps = {
  className: undefined,
  pointComponent: undefined,
  pointStyle: undefined,
  color: undefined,
};
