import * as React from 'react';
import { SplineSeries as SplineSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';

export class SplineSeries extends React.PureComponent {
  render() {
    return (
      <SplineSeriesBase
        rootComponent={Root}
        {...this.props}
      />
    );
  }
}

SplineSeries.Root = Root;
