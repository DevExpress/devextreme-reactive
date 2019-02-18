import * as React from 'react';
import { dLine } from '@devexpress/dx-chart-core';
import { Path } from './path';
import { AreaSeries } from '../../types';

const defaultProps = {
  path: dLine,
};
export class Line extends React.PureComponent<AreaSeries.SeriesProps> {
  static defaultProps = defaultProps;
  render() {
    return <Path {...this.props} />;
  }
}
