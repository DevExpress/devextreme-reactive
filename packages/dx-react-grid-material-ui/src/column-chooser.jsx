import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ColumnChooserPanel } from './templates/column-chooser-panel';
import { ColumnChooserPanelItem } from './templates/column-chooser-panel-item';

const contentTemplate = props => <ColumnChooserPanel {...props} />;
const itemTemplate = props => <ColumnChooserPanelItem {...props} />;

export const ColumnChooser = props => (
  <ColumnChooserBase
    contentTemplate={contentTemplate}
    itemTemplate={itemTemplate}
    {...props}
  />
);
