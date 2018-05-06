import * as React from 'react';
import { Legend as LegendBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/legend/root';
import { Label } from '../templates/legend/label';
import { Marker } from '../templates/legend/marker';

export class Legend extends React.PureComponent {
  render() {
    return (
      <LegendBase
        rootComponent={Root}
        labelComponent={Label}
        markerComponent={Marker}
        {...this.props}
      />
    );
  }
}

Legend.Root = Root;
Legend.Marker = Marker;
Legend.Label = Label;
