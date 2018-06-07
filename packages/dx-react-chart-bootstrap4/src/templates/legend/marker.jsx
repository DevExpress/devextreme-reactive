import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Marker extends React.PureComponent {
  render() {
    const { className, color, ...restProps } = this.props;
    return (
      <svg className={classNames('mx-2', className)} fill={color} width="10" height="10" {...restProps}>
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

