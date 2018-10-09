import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Path extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      style,
      seriesName,
      animation,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        stroke={color}
        style={{ ...style, ...animation(undefined, seriesName) }}
        {...restProps}
      />
    );
  }
}

Path.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  seriesName: PropTypes.string.isRequired,
  animation: PropTypes.func,
};

Path.defaultProps = {
  color: undefined,
  style: undefined,
  animation: () => {},
};
