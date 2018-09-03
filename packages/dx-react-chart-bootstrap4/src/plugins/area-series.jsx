import * as React from 'react';
import { AreaSeries as AreaSeriesBase } from '@devexpress/dx-react-chart';
import { Area } from '../templates/series/area';

export class AreaSeries extends React.PureComponent {
  render() {
    return (
      <AreaSeriesBase
        seriesComponent={Area}
        {...this.props}
      />
    );
  }
}

AreaSeries.Path = Area;
