import React from 'react';
import { closest } from './utils/table';

const getKeyGetter = getIntrinsicKey => (object, index) => {
  const intrinsicKey = getIntrinsicKey(object);
  const type = object.type || 'data';
  const key = intrinsicKey === undefined ? `$${index}` : intrinsicKey;
  return `${type}_${key}`;
};

export const TableCell = (props) => {
  const { row, column, colspan, cellContentTemplate, isHeader } = props;
  const TagName = isHeader ? 'th' : 'td';

  return (
    <TagName
      style={{
        width: column.width ? `${column.width}px` : 'auto',
      }}
      colSpan={colspan}
      data-cell={JSON.stringify({ rowId: row.id, columnName: column.name })}
    >
      {cellContentTemplate({ row, column })}
    </TagName>
  );
};

TableCell.propTypes = {
  row: React.PropTypes.object.isRequired,
  column: React.PropTypes.object.isRequired,
  colspan: React.PropTypes.number.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
  isHeader: React.PropTypes.bool,
};

TableCell.defaultProps = {
  isHeader: false,
};

export const TableRow = (props) => {
  const { row, columns, getCellInfo, cellContentTemplate, isHeader } = props;
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
            isHeader={isHeader}
            row={row}
            column={column}
            colspan={info.colspan}
            cellContentTemplate={cellContentTemplate}
          />
        );
      })}
    </tr>
  );
};

TableRow.propTypes = {
  row: React.PropTypes.object.isRequired,
  columns: React.PropTypes.array.isRequired,
  getCellInfo: React.PropTypes.func.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
  isHeader: React.PropTypes.bool,
};

TableRow.defaultProps = {
  isHeader: false,
};

export const Table = ({
  headerRows, bodyRows, columns, cellContentTemplate, getCellInfo, onClick,
}) => {
  const rowKeyGetter = getKeyGetter(row => row.id);

  return (
    <div className="table-responsive">
      <table
        className="table"
        onClick={(e) => {
          const { target } = e;
          const cellEl = closest(target, 'th') || closest(target, 'td');
          if (!cellEl) return;

          const { rowId, columnName } = JSON.parse(cellEl.getAttribute('data-cell'));
          const row = [...headerRows, ...bodyRows].find(r => r.id === rowId);
          const column = columns.find(c => c.name === columnName);
          onClick({ row, column, e });
        }}
      >
        <thead>
          {headerRows.map((row, rowIndex) => (
            <TableRow
              key={rowKeyGetter(row, rowIndex)}
              row={row}
              columns={columns}
              cellContentTemplate={cellContentTemplate}
              getCellInfo={getCellInfo}
              isHeader
            />
          ))}
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <TableRow
              key={rowKeyGetter(row, rowIndex)}
              row={row}
              columns={columns}
              cellContentTemplate={cellContentTemplate}
              getCellInfo={getCellInfo}
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
  getCellInfo: React.PropTypes.func.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func,
};
