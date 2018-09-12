import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Area extends React.PureComponent {
  render() {
    const {
      path,
      coordinates,
      color,
      value,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        fill={color}
        {...restProps}
      />
    );
  }
}

Area.propTypes = {
  path: PropTypes.func.isRequired,
  coordinates: PropTypes.array.isRequired,
  color: PropTypes.string,
};

Area.defaultProps = {
  color: undefined,
};
