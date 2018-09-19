import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Bar extends React.PureComponent {
  render() {
    const { color, value, ...restProps } = this.props;
    return (
      <rect fill={color} {...restProps} />
    );
  }
}

Bar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

Bar.defaultProps = {
  color: undefined,
};
