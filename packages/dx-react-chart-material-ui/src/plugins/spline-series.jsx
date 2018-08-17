import * as React from 'react';
import { SplineSeries as SplineSeriesBase } from '@devexpress/dx-react-chart';
import { Path } from '../templates/series/path';

export class SplineSeries extends React.PureComponent {
  render() {
    return (
      <SplineSeriesBase
        seriesComponent={Path}
        {...this.props}
      />
    );
  }
}

SplineSeries.Path = Path;
