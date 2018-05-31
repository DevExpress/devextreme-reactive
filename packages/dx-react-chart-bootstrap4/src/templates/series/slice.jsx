import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Slice extends React.PureComponent {
  render() {
    const {
      x, y, d, ...restProps
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={d}
        {...restProps}
      />
    );
  }
}

Slice.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Slice.defaultProps = {
  style: null,
};
