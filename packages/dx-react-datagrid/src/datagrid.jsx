import React from 'react';
import { PluginHost, Getter } from '@devexpress/dx-react-core';

const rowIdGetter = (getRowId, rows) => {
  let rowsMap;
  return (row) => {
    const originalRow = row._originalRow || row;
    if (getRowId) return getRowId(originalRow);
    if (!rowsMap) rowsMap = new Map(rows.map((r, rowIndex) => [r, rowIndex]));
    return rowsMap.get(originalRow);
  };
};

export const DataGrid = ({ rows, getRowId, columns, children }) => (
  <PluginHost>
    <Getter name="rows" value={rows} />
    <Getter name="columns" value={columns} />
    <Getter
      name="getRowId"
      pureComputed={rowIdGetter}
      connectArgs={() => [getRowId, rows]}
    />
    {children}
  </PluginHost>
);

DataGrid.propTypes = {
  rows: React.PropTypes.array.isRequired,
  getRowId: React.PropTypes.func,
  columns: React.PropTypes.array.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]).isRequired,
};

DataGrid.defaultProps = {
  getRowId: null,
};
