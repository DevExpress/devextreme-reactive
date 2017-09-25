import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';

export const Grid = ({
  data,
  columns,
  getRowDataId,
  getCellValue,
  rootTemplate,
  headerPlaceholderTemplate,
  footerPlaceholderTemplate,
  children,
}) => (
  <PluginHost>
    <GridCore
      data={data}
      columns={columns}
      getRowDataId={getRowDataId}
      getCellValue={getCellValue}
      rootTemplate={rootTemplate}
      headerPlaceholderTemplate={headerPlaceholderTemplate}
      footerPlaceholderTemplate={footerPlaceholderTemplate}
    />
    {children}
  </PluginHost>
);

Grid.propTypes = {
  data: PropTypes.array.isRequired,
  getRowDataId: PropTypes.func,
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
  getRowDataId: null,
  getCellValue: null,
  headerPlaceholderTemplate: null,
  footerPlaceholderTemplate: null,
  children: null,
};
