import * as React from 'react';
import { dSpline } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { SplineSeries, PathFn } from '../../types';

export class Spline extends React.PureComponent<SplineSeries.SeriesProps> {
  static defaultProps: Partial<SplineSeries.SeriesProps> = {
    // TODO: Move "PathFn" to "dx-chart-core".
    path: dSpline as any as PathFn,
  };

  render() {
    return <Path {...this.props} />;
  }
}
