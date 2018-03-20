import * as React from 'react';
import { BarSeries as BarSeriesBase } from '@devexpress/dx-react-chart';
import { Bar } from '../templates/series/bar';

export class BarSeries extends React.PureComponent {
  render() {
    return (
      <BarSeriesBase
        rootComponent={Bar}
        {...this.props}
      />
    );
  }
}

BarSeries.Root = Bar;
