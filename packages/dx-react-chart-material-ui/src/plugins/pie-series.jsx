import * as React from 'react';
import { PieSeries as PieSeriesBase } from '@devexpress/dx-react-chart';
import { Slice } from '../templates/series/slice';

export class PieSeries extends React.PureComponent {
  render() {
    return (
      <PieSeriesBase
        pointComponent={Slice}
        {...this.props}
      />
    );
  }
}

PieSeries.Point = Slice;
