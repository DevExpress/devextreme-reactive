import * as React from 'react';
import {
  getAreaAnimationStyle, HOVERED, SELECTED,
  TransformedPoint, Scales, BuildAnimatedStyleGetterFn,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';

type RawPathProps = {
  path: any,
  coordinates: TransformedPoint[],
  index: number,
  state?: string,
  color?: string,
  style?: any,
  scales: Scales,
  getAnimatedStyle: BuildAnimatedStyleGetterFn,
  pointComponent: any,
};

class RawPath extends React.PureComponent<RawPathProps> {
  render() {
    const {
      path,
      coordinates,
      index, state, pointComponent,
      color,
      style, scales, getAnimatedStyle,
      ...restProps
    } = this.props;
    return (
      <path
        d={path(coordinates)}
        fill="none"
        strokeWidth={2}
        stroke={color}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

export const Path = withStates({
  [HOVERED]: props => ({ strokeWidth: 4, ...props }),
  [SELECTED]: props => ({ strokeWidth: 4, ...props }),
})(RawPath);
