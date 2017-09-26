import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ColumnChooserPanel } from './templates/column-chooser-panel';

const contentTemplate = props => <ColumnChooserPanel {...props} />;

export const ColumnChooser = props => (
  <ColumnChooserBase
    contentTemplate={contentTemplate}
    {...props}
  />
);
