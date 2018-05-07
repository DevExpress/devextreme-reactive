import * as React from 'react';
import { SplineSeries as SplineSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';
import { Path } from '../templates/series/path';
import { Point } from '../templates/series/point';

export class SplineSeries extends React.PureComponent {
  render() {
    return (
      <SplineSeriesBase
        rootComponent={Root}
        pathComponent={Path}
        pointComponent={Point}
        {...this.props}
      />
    );
  }
}

SplineSeries.Root = Root;
SplineSeries.Path = Path;
SplineSeries.Point = Point;
