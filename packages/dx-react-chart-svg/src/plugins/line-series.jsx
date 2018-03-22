import * as React from 'react';
import { LineSeries as LineSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';
import { Path } from '../templates/series/path';
import { Point } from '../templates/series/point';

export class LineSeries extends React.PureComponent {
  render() {
    return (
      <LineSeriesBase
        rootComponent={Root}
        pathComponent={Path}
        pointComponent={Point}
        {...this.props}
      />
    );
  }
}

LineSeries.Path = Path;
LineSeries.Root = Root;
LineSeries.Point = Point;
