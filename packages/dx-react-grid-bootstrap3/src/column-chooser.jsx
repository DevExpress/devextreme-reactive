import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ColumnChooserContainer } from './templates/column-chooser-container';
import { ColumnChooserItem } from './templates/column-chooser-item';

export const ColumnChooser = props => (
  <ColumnChooserBase
    containerComponent={ColumnChooserContainer}
    itemComponent={ColumnChooserItem}
    {...props}
  />
);

ColumnChooser.Container = ColumnChooserContainer;
ColumnChooser.Item = ColumnChooserItem;
