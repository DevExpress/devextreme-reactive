import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ColumnChooserContainer } from './templates/column-chooser-container';
import { ColumnChooserItem } from './templates/column-chooser-item';

const containerTemplate = props => <ColumnChooserContainer {...props} />;
const itemTemplate = props => <ColumnChooserItem {...props} />;

export const ColumnChooser = props => (
  <ColumnChooserBase
    containerTemplate={containerTemplate}
    itemTemplate={itemTemplate}
    {...props}
  />
);
