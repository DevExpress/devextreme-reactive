import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost, Getter } from '@devexpress/dx-react-core';

export const DataGridBase = ({ rows, columns }) => (
  <div>
    <Getter name="rows" value={rows} />
    <Getter name="columns" value={columns} />
  </div>
);

DataGridBase.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export const DataGrid = ({ rows, columns, children }) => (
  <PluginHost>
    <DataGridBase rows={rows} columns={columns} />
    {children}
  </PluginHost>
);

DataGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
