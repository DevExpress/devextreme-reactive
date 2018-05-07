import * as React from 'react';
import { ScatterSeries as ScatterSeriesBase } from '@devexpress/dx-react-chart';
import { Point } from '../templates/series/point';

export class ScatterSeries extends React.PureComponent {
  render() {
    return (
      <ScatterSeriesBase
        pointComponent={Point}
        {...this.props}
      />
    );
  }
}

ScatterSeries.Point = Point;
