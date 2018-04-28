import * as React from 'react';
import { ScatterSeries as ScatterSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';
import { Point } from '../templates/series/point';

export class ScatterSeries extends React.PureComponent {
  render() {
    return (
      <ScatterSeriesBase
        rootComponent={Root}
        pointComponent={Point}
        {...this.props}
      />
    );
  }
}

ScatterSeries.Root = Root;
