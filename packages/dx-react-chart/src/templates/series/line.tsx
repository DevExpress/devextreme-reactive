import * as React from 'react';
import { dLine, dRotateLine } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { LineSeries } from '../../types';

export class Line extends React.PureComponent<LineSeries.SeriesProps> {
  render() {
    const { isRotated, path } = this.props;
    const dPath = path === undefined ? (isRotated ? dRotateLine : dLine) : path;
    return <Path {...this.props} path={dPath} />;
  }
}
