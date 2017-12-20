import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { Overlay } from '../templates/column-chooser/overlay';
import { Container } from '../templates/column-chooser/container';
import { ToggleButton } from '../templates/column-chooser/toggle-button';
import { Item } from '../templates/column-chooser/item';

export class ColumnChooser extends React.PureComponent {
  render() {
    return (
      <ColumnChooserBase
        overlayComponent={Overlay}
        containerComponent={Container}
        buttonComponent={ToggleButton}
        itemComponent={Item}
        {...this.props}
      />
    );
  }
}

ColumnChooser.Container = Container;
ColumnChooser.Button = ToggleButton;
ColumnChooser.Item = Item;
ColumnChooser.Overlay = Overlay;
