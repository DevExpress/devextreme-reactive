import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Marker extends React.PureComponent {
  render() {
    const { className, color, ...restProps } = this.props;
    return (
      <svg className={className} fill={color} width="10" height="10" {...restProps}>
        <circle r={5} cx={5} cy={5} {...restProps} />
      </svg>);
  }
}

Marker.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

Marker.defaultProps = {
  className: undefined,
  color: undefined,
};
