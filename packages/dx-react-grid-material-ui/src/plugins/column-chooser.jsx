import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { PopoverComponent } from '../templates/column-chooser/popover-component';
import { ContainerComponent } from '../templates/column-chooser/container-component';
import { ButtonComponent } from '../templates/column-chooser/button-component';
import { ItemComponent } from '../templates/column-chooser/item-component';

export class ColumnChooser extends React.PureComponent {
  render() {
    return (
      <ColumnChooserBase
        popoverComponent={PopoverComponent}
        containerComponent={ContainerComponent}
        buttonComponent={ButtonComponent}
        itemComponent={ItemComponent}
        {...this.props}
      />
    );
  }
}

this.Container = ContainerComponent;
this.Button = ButtonComponent;
this.Item = ItemComponent;
this.Popover = PopoverComponent;
