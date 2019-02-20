import * as React from 'react';
import { dLine } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { LineSeries } from '../../types';

export class Line extends React.PureComponent<LineSeries.SeriesProps> {
  static defaultProps: Partial<LineSeries.SeriesProps> = {
    path: dLine,
  };

  render() {
    return <Path {...this.props} />;
  }
}
