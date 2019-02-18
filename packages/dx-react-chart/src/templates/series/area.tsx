import * as React from 'react';
import {
  dArea, getAreaAnimationStyle, HOVERED, SELECTED,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { AreaSeries } from '../../types';

class RawArea extends React.PureComponent<AreaSeries.SeriesProps> {
  static defaultProps = { path: dArea };
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
        d={path!(coordinates)}
        fill={color}
        opacity={0.5}
        style={getAnimatedStyle(style, getAreaAnimationStyle, scales)}
        {...restProps}
      />
    );
  }
}

export const Area: React.ComponentType<AreaSeries.SeriesProps> = withStates({
  [HOVERED]: withPattern(
    ({ index }) => `series-${index}-hover`, { opacity: 0.75 },
  )(RawArea),
  [SELECTED]: withPattern(
    ({ index }) => `series-${index}-selection`, { opacity: 0.5 },
  )(RawArea),
})(RawArea);
