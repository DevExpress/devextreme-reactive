import * as React from 'react';
import { dLine } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { LineSeries, PathFn } from '../../types';

export class Line extends React.PureComponent<LineSeries.SeriesProps> {
  static defaultProps: Partial<LineSeries.SeriesProps> = {
    // TODO: Move "PathFn" to "dx-chart-core".
    path: dLine as any as PathFn,
  };

  render() {
    return <Path {...this.props} />;
  }
}
