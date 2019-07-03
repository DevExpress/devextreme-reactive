import * as React from 'react';
import { dSpline, dRotateSpline } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { SplineSeries } from '../../types';

export class Spline extends React.PureComponent<SplineSeries.SeriesProps> {
  render() {
    const { rotated, path } = this.props;
    const dPath = path === undefined ? (rotated ? dRotateSpline : dSpline) : path;
    return <Path {...this.props} path={dPath} />;
  }
}
