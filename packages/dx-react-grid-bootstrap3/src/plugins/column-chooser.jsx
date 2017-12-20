import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { OverlayComponent } from '../templates/column-chooser/column-chooser-overlay';
import { ColumnChooserContainer } from '../templates/column-chooser/column-chooser-container';
import { ColumnChooserItem } from '../templates/column-chooser/column-chooser-item';
import { ButtonComponent } from '../templates/column-chooser/button-component';

export const ColumnChooser = props => (
  <ColumnChooserBase
    overlayComponent={OverlayComponent}
    containerComponent={ColumnChooserContainer}
    itemComponent={ColumnChooserItem}
    buttonComponent={ButtonComponent}
    {...props}
  />
);

ColumnChooser.Container = ColumnChooserContainer;
ColumnChooser.Item = ColumnChooserItem;
