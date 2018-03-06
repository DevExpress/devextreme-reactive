import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';

export const Grid = ({
  rows,
  columns,
  getRowId,
  getCellValue,
  rootComponent,
  children,
  bandColumns,
}) => (
  <PluginHost>
    <GridCore
      rows={rows}
      columns={columns}
      bandColumns={bandColumns}
      getRowId={getRowId}
      getCellValue={getCellValue}
      rootComponent={rootComponent}
    />
    {children}
  </PluginHost>
);

Grid.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellValue: PropTypes.func,
  columns: PropTypes.array,
  rootComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Grid.defaultProps = {
  columns: undefined,
  getRowId: undefined,
  getCellValue: undefined,
  children: undefined,
};
