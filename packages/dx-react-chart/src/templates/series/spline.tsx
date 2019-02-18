import * as React from 'react';
import { dSpline } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { AreaSeries } from '../../types';

export class Spline extends React.PureComponent<AreaSeries.SeriesProps> {
  static defaultProps = { path: dSpline };
  render() {
    return <Path {...this.props} />;
  }
}
