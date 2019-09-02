import * as React from 'react';
import { PathComponentProps } from '../../types';

/** @internal */
export class PointCollection extends React.PureComponent<PathComponentProps> {
  render() {
    const {
      pointComponent,
      coordinates,
      index,
      state,
      clipPathId,
      ...restProps // restProps are used because of getAnimatedStyle and scale
    } = this.props;
    const Point = pointComponent!;
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
