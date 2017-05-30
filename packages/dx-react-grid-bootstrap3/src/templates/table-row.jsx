import React from 'react';
import PropTypes from 'prop-types';

import {
  getCellInfo,
  getKeyGetter,
} from '@devexpress/dx-react-grid';

export const TableRow = (props) => {
  const { row, columns, cellTemplate } = props;
  const TableCell = cellTemplate;
  const columnKeyGetter = getKeyGetter(column => column.name);

  const height = (!row.height || row.height === 'auto') ? 'auto' : `${row.height}px`;
  return (
    <tr
      className={row.selected ? 'active' : ''}
      style={{ height }}
    >
      {columns.map((column, columnIndex) => {
        const info = getCellInfo({ row, column, columnIndex, columns });
        if (info.skip) return null;
        return (
          <TableCell
            key={columnKeyGetter(column, columnIndex)}
            row={row}
            column={column}
            colspan={info.colspan}
            style={column.width ? { width: column.width } : null}
          />
        );
      })}
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
  isHeader: false,
};
