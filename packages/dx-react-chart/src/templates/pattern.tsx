import * as React from 'react';
import { PatternProps } from '../types';

export class Pattern extends React.PureComponent<PatternProps> {
  static defaultProps: Partial<PatternProps> = {
    size: 6,
    opacity: 0.75,
  };

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
            // tslint:disable-next-line: max-line-length
            d={`M ${size! / 2} ${-size! / 2} L ${-size! / 2} ${size! / 2} M 0 ${size!} L ${size!} 0 M ${size! * 1.5} ${size! / 2} L ${size! / 2} ${size! * 1.5}`}
            strokeWidth={2}
            stroke={color}
          />
        </pattern>
      </defs>
    );
  }
}
