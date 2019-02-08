import * as React from 'react';
import {
  dArea, getAreaAnimationStyle, HOVERED, SELECTED, Scales,
  BuildAnimatedStyleGetterFn, TransformedPoint,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

const defaultProps = { path: dArea };
type RawAreaDefaultProps = Readonly<typeof defaultProps>;
type RawAreaProps = {
  coordinates: TransformedPoint[],
  index: number,
  state?: string,
  color?: string,
  style?: any,
  scales: Scales,
  getAnimatedStyle: BuildAnimatedStyleGetterFn,
  pointComponent?: any,
} & RawAreaDefaultProps;

class RawArea extends React.PureComponent<RawAreaProps> {
  static defaultProps = defaultProps;
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
        d={path(coordinates)!}
        fill={color}
        opacity={0.5}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

export const Area = withStates({
  [HOVERED]: withPattern(
    ({ index }) => `series-${index}-hover`, { opacity: 0.75 },
  )(RawArea),
  [SELECTED]: withPattern(
    ({ index }) => `series-${index}-selection`, { opacity: 0.5 },
  )(RawArea),
})(RawArea);
