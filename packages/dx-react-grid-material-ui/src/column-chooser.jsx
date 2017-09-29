import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ColumnChooserContainer } from './templates/column-chooser-container';
import { ColumnChooserPanelItem } from './templates/column-chooser-panel-item';

const containerTemplate = props => <ColumnChooserContainer {...props} />;
const itemTemplate = props => <ColumnChooserPanelItem {...props} />;

export const ColumnChooser = props => (
  <ColumnChooserBase
    containerTemplate={containerTemplate}
    itemTemplate={itemTemplate}
    {...props}
  />
);
