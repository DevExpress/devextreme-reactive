import React from 'react';
import PropTypes from 'prop-types';
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

export const Grid = ({ rows, getRowId, columns, children }) => (
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

Grid.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  columns: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Grid.defaultProps = {
  getRowId: null,
};
