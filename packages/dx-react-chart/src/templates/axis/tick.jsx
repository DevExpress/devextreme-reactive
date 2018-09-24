import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Tick extends React.PureComponent {
  render() {
    const {
      x1, x2, y1, y2, className, ...restProps
    } = this.props;
    return (
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        {...restProps}
      />
    );
  }
}

Tick.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};
