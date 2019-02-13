import * as React from 'react';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';
import { GridProps } from './types';

export const Grid: React.SFC<GridProps> = ({
  rows,
  columns,
  getRowId,
  getCellValue,
  rootComponent,
  children,
}) => (
  <PluginHost>
    <GridCore
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      getCellValue={getCellValue}
      rootComponent={rootComponent}
    />
    {children}
  </PluginHost>
);
