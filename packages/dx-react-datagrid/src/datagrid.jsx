import React from 'react';
import { PluginHost, Getter } from '@devexpress/dx-react-core';

export const DataGridBase = ({ rows, columns }) => (
  <div>
    <Getter name="rows" value={rows} />
    <Getter name="columns" value={columns} />
  </div>
);

DataGridBase.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
};

export const DataGrid = ({ rows, columns, children }) => (
  <PluginHost>
    <DataGridBase rows={rows} columns={columns} />
    {children}
  </PluginHost>
);

DataGrid.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  children: React.PropTypes.array.isRequired,
};
