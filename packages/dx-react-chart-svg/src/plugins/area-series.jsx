import * as React from 'react';
import { AreaSeries as AreaSeriesBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/series/root';

export class AreaSeries extends React.PureComponent {
  render() {
    return (
      <AreaSeriesBase
        rootComponent={Root}
        {...this.props}
      />
    );
  }
}

AreaSeries.Root = Root;
