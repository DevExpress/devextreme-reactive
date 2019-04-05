import * as React from 'react';

import { ZoomAndPan } from '../types';

export class DragBox extends React.PureComponent<ZoomAndPan.DragBoxProps> {
  render() {
    const {
      rect, ...restProps
    } = this.props;
    return (
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        {...restProps}
      />
    );
  }
}
