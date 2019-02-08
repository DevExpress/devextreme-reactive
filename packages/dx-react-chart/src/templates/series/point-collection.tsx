import * as React from 'react';
import {
  TransformedPoint,
} from '@devexpress/dx-chart-core';

type PointCollectionProps = {
  pointComponent: any,
  coordinates: TransformedPoint[],
  index: number,
  state?: string,
};

export class PointCollection extends React.PureComponent<PointCollectionProps> {
  render() {
    const {
      pointComponent: Point,
      coordinates,
      index,
      state,
      ...restProps // restProps are used because of getAnimatedStyle and scale
    } = this.props;
    return (coordinates.map(point => (
      <Point
        key={String(point.index)}
        seriesIndex={index}
        {...restProps}
        {...point}
      />
    )));
  }
}
