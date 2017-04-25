import React from 'react';

import { querySelectorAll } from './utils/dom';

const getKeyGetter = getIntrinsicKey => (object, index) => {
  const intrinsicKey = getIntrinsicKey(object);
  const type = object.type || 'data';
  const key = intrinsicKey === undefined ? `$${index}` : intrinsicKey;
  return `${type}_${key}`;
};

const getCellInfo = ({ row, columnIndex, columns }) => {
  if (row.colspan !== undefined && columnIndex > row.colspan) { return { skip: true }; }
  const colspan = row.colspan === columnIndex ? columns.length - row.colspan : 1;
  return { colspan };
};

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
  row: React.PropTypes.object.isRequired,
  columns: React.PropTypes.array.isRequired,
  cellTemplate: React.PropTypes.func.isRequired,
};

TableRow.defaultProps = {
  isHeader: false,
};

export const Table = ({
  headerRows, bodyRows, columns, cellTemplate, onClick,
}) => {
  const rowKeyGetter = getKeyGetter(row => row.id);

  return (
    <div className="table-responsive">
      <table
        className="table"
        style={{
          tableLayout: 'fixed',
        }}
        onClick={(e) => {
          const { target, currentTarget } = e;

          const rowsEls = querySelectorAll(currentTarget, ':scope > thead > tr, :scope > tbody > tr');
          const rowIndex = [...rowsEls].findIndex(rowEl => rowEl.contains(target));
          if (rowIndex === -1) return;
          const cellEls = querySelectorAll(rowsEls[rowIndex], ':scope > th, :scope > td');
          const columnIndex = [...cellEls].findIndex(cellEl => cellEl.contains(target));
          if (columnIndex === -1) return;

          const row = [...headerRows, ...bodyRows][rowIndex];
          const column = columns[columnIndex];
          onClick({ row, column, e });
        }}
      >
        <thead>
          {headerRows.map((row, rowIndex) => (
            <TableRow
              key={rowKeyGetter(row, rowIndex)}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <TableRow
              key={rowKeyGetter(row, rowIndex)}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
Table.defaultProps = {
  onClick: () => {},
};
Table.propTypes = {
  headerRows: React.PropTypes.array.isRequired,
  bodyRows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  cellTemplate: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func,
};
