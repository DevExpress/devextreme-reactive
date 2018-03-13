import * as React from 'react';
import { LineSeries as LineSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';

export class LineSeries extends React.PureComponent {
  render() {
    return (
      <LineSeriesBase
        rootComponent={Root}
        {...this.props}
      />
    );
  }
}

LineSeries.Root = Root;
