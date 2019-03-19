import * as React from 'react';

import { ZoomAndPan } from '../types';

export class DragBox extends React.PureComponent<ZoomAndPan.DragBoxProps> {
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
