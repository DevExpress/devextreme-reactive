import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Pattern extends React.PureComponent {
  render() {
    const {
      id, size, color, opacity,
    } = this.props;
    return (
      <defs>
        <pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <rect x={0} y={0} width={size} height={size} fill={color} opacity={opacity} />
          <path
            d={`M ${size / 2} ${-size / 2} L ${-size / 2} ${size / 2} M 0 ${size} L ${size} 0 M ${size * 1.5} ${size / 2} L ${size / 2} ${size * 1.5}`}
            strokeWidth={2}
            stroke={color}
          />
        </pattern>
      </defs>
    );
  }
}

Pattern.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string.isRequired,
  opacity: PropTypes.number,
};

Pattern.defaultProps = {
  size: 6,
  opacity: 0.75,
};
