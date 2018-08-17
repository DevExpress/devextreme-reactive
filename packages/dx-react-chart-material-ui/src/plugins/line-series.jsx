import * as React from 'react';
import { LineSeries as LineSeriesBase } from '@devexpress/dx-react-chart';
import { Path } from '../templates/series/path';

export class LineSeries extends React.PureComponent {
  render() {
    return (
      <LineSeriesBase
        seriesComponent={Path}
        {...this.props}
      />
    );
  }
}

LineSeries.Path = Path;
