import * as React from 'react';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';
import { GridProps } from './types';

const GridBase: React.FunctionComponent<GridProps> = ({
  rows,
  columns,
  getRowId,
  getCellValue,
  rootComponent,
  rootProps,
  children,
}) => (
  <PluginHost>
    <GridCore
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      getCellValue={getCellValue}
      rootComponent={rootComponent}
      rootProps={rootProps}
    />
    {children}
  </PluginHost>
);

/***
 * The Grid is a root container component designed to process and display data specified via
 * the `rows` property. You can configure columns using the `columns` property. The Grid's
 * functionality  is implemented in several plugins specified as child components.
 * See the plugins concept for details.
 * */
export const Grid: React.ComponentType<GridProps> = GridBase;
