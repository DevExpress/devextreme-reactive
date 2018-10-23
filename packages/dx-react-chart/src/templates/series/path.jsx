import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Path extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        stroke={color}
        {...restProps}
      />
    );
  }
}

Path.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
};

Path.defaultProps = {
  color: undefined,
};
