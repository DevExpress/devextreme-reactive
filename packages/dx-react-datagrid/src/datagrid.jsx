import React from 'react';
import { PluginHost, Getter } from '@devexpress/dx-react-core';

export const DataGrid = ({ rows, columns, children }) => (
  <PluginHost>
    <Getter name="rows" value={rows} />
    <Getter name="columns" value={columns} />
    {children}
  </PluginHost>
);

DataGrid.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]).isRequired,
};
