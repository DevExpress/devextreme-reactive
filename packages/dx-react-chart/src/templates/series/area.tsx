import * as React from 'react';
import {
  HOVERED, SELECTED, dArea, dRotateArea,
  processAreaAnimation, getPathStart,
  isCoordinatesChanged,
} from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { withAnimation } from '../../utils/with-animation';
import { AreaSeries } from '../../types';

class RawArea extends React.PureComponent<AreaSeries.SeriesProps> {
  render() {
    const {
      path,
      coordinates, animation,
      index, state, pointComponent,
      color, clipPathId, pane,
      scales, rotated,
      ...restProps
    } = this.props;
    const dPath = path === undefined ? (rotated ? dRotateArea : dArea) : path;
    return (
      <path
        clipPath={`url(#${clipPathId})`}
        d={dPath!(coordinates)}
        fill={color}
        opacity={0.5}
        {...restProps}
      />
    );
  }
}

// It should actually be `withPattern<AreaSeries.PointProps>` but `opacity` is not decleared there.
// It is not clear if `opacity` should be explicitly enumerated or stay as part of `restProps`.

export const Area: React.ComponentType<AreaSeries.SeriesProps> = withAnimation<any>(
  processAreaAnimation,
  ({ coordinates }) => ({ coordinates }),
  getPathStart,
  isCoordinatesChanged,
)(withStates({
  [HOVERED]: withPattern<any>(
    ({ index, color }) => `series-${index}-color-${color}-hover`, { opacity: 0.75 },
  )(RawArea),
  [SELECTED]: withPattern<any>(
    ({ index, color }) => `series-${index}-color-${color}-selection`, { opacity: 0.5 },
  )(RawArea),
})(RawArea));
