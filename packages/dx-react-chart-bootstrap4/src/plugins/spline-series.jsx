import * as React from 'react';
import { SplineSeries as SplineSeriesBase } from '@devexpress/dx-react-chart';
import { Path } from '../templates/series/path';
import { Point } from '../templates/series/point';

export class SplineSeries extends React.PureComponent {
  render() {
    return (
      <SplineSeriesBase
        pathComponent={Path}
        pointComponent={Point}
        {...this.props}
      />
    );
  }
}

SplineSeries.Path = Path;
SplineSeries.Point = Point;
