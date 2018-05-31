import * as React from 'react';
import { AreaSeries as AreaSeriesBase } from '@devexpress/dx-react-chart';
import { Area } from '../templates/series/area';
import { Point } from '../templates/series/point';

export class AreaSeries extends React.PureComponent {
  render() {
    return (
      <AreaSeriesBase
        seriesComponent={Area}
        pointComponent={() => null}
        {...this.props}
      />
    );
  }
}

AreaSeries.Path = Area;
AreaSeries.Point = Point;
