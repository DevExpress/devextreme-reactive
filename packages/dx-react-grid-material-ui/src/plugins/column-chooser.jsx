import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ContainerComponent } from './../templates/column-chooser/container-component';
import { ButtonComponent } from './../templates/column-chooser/button-component';
import { ItemComponent } from './../templates/column-chooser/item-component';

const containerComponent = props => <ContainerComponent {...props} />;
const buttonComponent = props => <ButtonComponent {...props} />;
const itemComponent = props => <ItemComponent {...props} />;

export const ColumnChooser = props => (
  <ColumnChooserBase
    containerTemplate={containerComponent}
    buttonTemplate={buttonComponent}
    itemTemplate={itemComponent}
    {...props}
  />
);

