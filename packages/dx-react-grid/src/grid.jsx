import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';

export const Grid = ({
  rows,
  columns,
  getRowId,
  getCellValue,
  rootTemplate,
  headerPlaceholderTemplate,
  footerPlaceholderTemplate,
  children,
}) => (
  <PluginHost>
    <GridCore
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      getCellValue={getCellValue}
      rootTemplate={rootTemplate}
      headerPlaceholderTemplate={headerPlaceholderTemplate}
      footerPlaceholderTemplate={footerPlaceholderTemplate}
    />
    {children}
  </PluginHost>
);

Grid.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellValue: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootTemplate: PropTypes.func.isRequired,
  headerPlaceholderTemplate: PropTypes.func,
  footerPlaceholderTemplate: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Grid.defaultProps = {
  getRowId: null,
  getCellValue: null,
  headerPlaceholderTemplate: null,
  footerPlaceholderTemplate: null,
  children: null,
};
