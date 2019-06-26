import * as React from 'react';
import { dLine, dRotateLine } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { LineSeries } from '../../types';

export class Line extends React.PureComponent<LineSeries.SeriesProps> {
  render() {
    const { rotated, path } = this.props;
    const dPath = path === undefined ? (rotated ? dRotateLine : dLine) : path;
    return <Path {...this.props} path={dPath} />;
  }
}
