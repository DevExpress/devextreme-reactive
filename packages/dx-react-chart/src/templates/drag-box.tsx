import * as React from 'react';

import { ZoomPan } from '../types';

export class DragBox extends React.PureComponent<ZoomPan.DragBoxProps> {
  render() {
    const {
      rectBox, color, opacity, ...restProps
    } = this.props;
    return (
      <svg>
        <rect
          x={rectBox.x}
          y={rectBox.y}
          width={rectBox.width}
          height={rectBox.height}
          fill={color}
          opacity={opacity}
          {...restProps}
        />
      </svg>
    );
  }
}
