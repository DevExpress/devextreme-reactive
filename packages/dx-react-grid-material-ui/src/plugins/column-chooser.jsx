import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { OverlayComponent } from '../templates/column-chooser/overlay-component';
import { ContainerComponent } from '../templates/column-chooser/container-component';
import { ButtonComponent } from '../templates/column-chooser/button-component';
import { ColumnChooserItem } from '../templates/column-chooser/item-component';

export class ColumnChooser extends React.PureComponent {
  render() {
    return (
      <ColumnChooserBase
        overlayComponent={OverlayComponent}
        containerComponent={ContainerComponent}
        buttonComponent={ButtonComponent}
        itemComponent={ColumnChooserItem}
        {...this.props}
      />
    );
  }
}
