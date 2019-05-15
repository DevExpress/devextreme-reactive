import * as React from 'react';
import { ClipPathProps } from '../types';

const EXTRA_PIXELS = 2;

export class ClipPath extends React.PureComponent<ClipPathProps> {
  render() {
    const {
      id, width, height,
    } = this.props;
    return (
      <defs>
        <clipPath id={id}>
          <rect
            x={-EXTRA_PIXELS / 2}
            y={-EXTRA_PIXELS / 2}
            width={width + EXTRA_PIXELS}
            height={height + EXTRA_PIXELS}
          />
        </clipPath>
      </defs>
    );
  }
}
