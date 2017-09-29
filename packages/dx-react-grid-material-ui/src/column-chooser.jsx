import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ColumnChooserPanel } from './templates/column-chooser-panel';
import { ColumnChooserPanelItem } from './templates/column-chooser-panel-item';

const containerTemplate = props => <ColumnChooserPanel {...props} />;
const itemTemplate = props => <ColumnChooserPanelItem {...props} />;

export const ColumnChooser = props => (
  <ColumnChooserBase
    containerTemplate={containerTemplate}
    itemTemplate={itemTemplate}
    {...props}
  />
);
