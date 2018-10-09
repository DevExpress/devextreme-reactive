import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Area extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      style,
      animation,
      seriesName,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        fill={color}
        style={{ ...style, ...animation(undefined, seriesName) }}
        {...restProps}
      />
    );
  }
}

Area.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  seriesName: PropTypes.string.isRequired,
  animation: PropTypes.func,
};

Area.defaultProps = {
  color: undefined,
  style: undefined,
  animation: () => {},
};
