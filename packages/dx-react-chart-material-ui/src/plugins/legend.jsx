import * as React from 'react';
import { Legend as LegendBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/legend/root';
import { Item } from '../templates/legend/item';
import { Label } from '../templates/legend/label';
import { Marker } from '../templates/legend/marker';

export class Legend extends React.PureComponent {
  render() {
    return (
      <LegendBase
        labelComponent={Label}
        markerComponent={Marker}
        rootComponent={Root}
        itemComponent={Item}
        {...this.props}
      />
    );
  }
}

Legend.Root = Root;
Legend.Marker = Marker;
Legend.Label = Label;
Legend.Item = Item;
