import * as React from 'react';
import { AreaSeries as AreaSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';
import { Path } from '../templates/series/path';
import { Point } from '../templates/series/point';

export class AreaSeries extends React.PureComponent {
  render() {
    return (
      <AreaSeriesBase
        rootComponent={Root}
        pathComponent={Path}
        pointComponent={Point}
        {...this.props}
      />
    );
  }
}

AreaSeries.Root = Root;
AreaSeries.Path = Path;
AreaSeries.Point = Point;
