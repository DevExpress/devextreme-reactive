import * as React from 'react';
import {
  processLineAnimation, HOVERED, SELECTED, isCoordinatesChanged, getPathStart,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withAnimation } from '../../utils/with-animation';
import { PathComponentPathProps } from '../../types';

class RawPath extends React.PureComponent<PathComponentPathProps> {
  render() {
    const {
      path, animation,
      coordinates, rotated,
      index, state, pointComponent,
      color, clipPathId,
      scales, pane,
      ...restProps
    } = this.props;
    return (
      <path
        clipPath={`url(#${clipPathId})`}
        d={path!(coordinates)}
        fill="none"
        strokeWidth={2}
        stroke={color}
        {...restProps}
      />
    );
  }
}

export const Path = withAnimation<any>(
  processLineAnimation,
  ({ coordinates }) => ({ coordinates }),
  getPathStart,
  isCoordinatesChanged,
)(withStates({
  [HOVERED]: props => ({ strokeWidth: 4, ...props }),
  [SELECTED]: props => ({ strokeWidth: 4, ...props }),
})(RawPath));
