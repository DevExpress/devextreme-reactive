import * as React from 'react';
import { BarSeries as BarSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';
import { Bar } from '../templates/series/bar';

export class BarSeries extends React.PureComponent {
  render() {
    return (
      <BarSeriesBase
        pointComponent={Bar}
        rootComponent={Root}
        {...this.props}
      />
    );
  }
}

BarSeries.Root = Root;
BarSeries.Point = Bar;
