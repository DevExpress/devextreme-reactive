import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Marker extends React.PureComponent {
  render() {
    const { color, ...restProps } = this.props;
    return (
      <svg fill={color} width="10" height="10" {...restProps}>
        <circle r={5} cx={5} cy={5} {...restProps} />
      </svg>
    );
  }
}

Marker.propTypes = {
  color: PropTypes.string,
};

Marker.defaultProps = {
  color: undefined,
};
