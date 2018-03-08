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

Grid.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellValue: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Grid.defaultProps = {
  getRowId: undefined,
  getCellValue: undefined,
  children: undefined,
};
