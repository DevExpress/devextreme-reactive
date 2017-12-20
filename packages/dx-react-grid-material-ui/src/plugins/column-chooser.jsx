import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { OverlayComponent } from '../templates/column-chooser/overlay-component';
import { ContainerComponent } from '../templates/column-chooser/container-component';
import { ButtonComponent } from '../templates/column-chooser/button-component';
import { ItemComponent } from '../templates/column-chooser/item-component';

export class ColumnChooser extends React.PureComponent {
  render() {
    return (
      <ColumnChooserBase
        overlayComponent={OverlayComponent}
        containerComponent={ContainerComponent}
        buttonComponent={ButtonComponent}
        itemComponent={ItemComponent}
        {...this.props}
      />
    );
  }
}

ColumnChooser.Container = ContainerComponent;
ColumnChooser.Button = ButtonComponent;
ColumnChooser.Item = ItemComponent;
ColumnChooser.Overlay = OverlayComponent;
