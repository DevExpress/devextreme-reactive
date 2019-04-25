import * as React from 'react';
import { dSpline } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { SplineSeries } from '../../types';

export class Spline extends React.PureComponent<SplineSeries.SeriesProps> {
  static defaultProps: Partial<SplineSeries.SeriesProps> = {
    path: dSpline,
  };

  render() {
    return <Path {...this.props} />;
  }
}
