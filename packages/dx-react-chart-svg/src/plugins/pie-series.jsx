import * as React from 'react';
import { PieSeries as PieSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';
import { Slice } from '../templates/series/slice';

export class PieSeries extends React.PureComponent {
  render() {
    return (
      <PieSeriesBase
        pointComponent={Slice}
        rootComponent={Root}
        {...this.props}
      />
    );
  }
}

PieSeries.Root = Root;
PieSeries.Point = Slice;
