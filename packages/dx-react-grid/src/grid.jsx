import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';

export const Grid = ({
  rows,
  columns,
  getRowId,
  getCellValue,
  rootComponent,
  headerPlaceholderComponent,
  footerPlaceholderComponent,
  children,
}) => (
  <PluginHost>
    <GridCore
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      getCellValue={getCellValue}
      rootComponent={rootComponent}
      headerPlaceholderComponent={headerPlaceholderComponent}
      footerPlaceholderComponent={footerPlaceholderComponent}
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
  headerPlaceholderComponent: PropTypes.func,
  footerPlaceholderComponent: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Grid.defaultProps = {
  getRowId: undefined,
  getCellValue: undefined,
  headerPlaceholderComponent: undefined,
  footerPlaceholderComponent: undefined,
  children: undefined,
};
