import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';

export const Grid = ({
  rows,
  columns,
  isRtl,
  getRowId,
  getCellValue,
  rootComponent,
  children,
}) => (
  <PluginHost>
    <GridCore
      rows={rows}
      columns={columns}
      isRtl={isRtl}
      getRowId={getRowId}
      getCellValue={getCellValue}
      rootComponent={rootComponent}
    />
    {children}
  </PluginHost>
);

Grid.propTypes = {
  isRtl: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellValue: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Grid.defaultProps = {
  isRtl: undefined,
  getRowId: undefined,
  getCellValue: undefined,
  children: undefined,
};
