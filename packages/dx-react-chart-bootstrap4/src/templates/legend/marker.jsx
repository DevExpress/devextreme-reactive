import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Marker extends React.PureComponent {
  render() {
    const { className, themeColor, ...restProps } = this.props;
    return (
      <svg className={className} fill={themeColor} width="10" height="10" {...restProps}>
        <circle r={5} cx={5} cy={5} {...restProps} />
      </svg>);
  }
}

Marker.propTypes = {
  className: PropTypes.string,
  themeColor: PropTypes.string,
};

Marker.defaultProps = {
  className: undefined,
  themeColor: undefined,
};

