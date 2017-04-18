import React from 'react';

const getCellInfo = ({ row, columnIndex, columns }) => {
  if (row.colspan !== undefined && columnIndex > row.colspan) { return { skip: true }; }
  const colspan = row.colspan === columnIndex ? columns.length - row.colspan : 1;
  return { colspan };
};

const TableRow = (props) => {
  const { row, columns, cellTemplate } = props;

  const TableCell = cellTemplate;

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
            key={column.name}
            row={row}
            column={column}
            colspan={info.colspan}
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

export const Table = (props) => {
  const { headerRows, bodyRows, columns, cellTemplate, onClick } = props;

  return (
    <div className="table-responsive">
      <table
        className="table"
        onClick={(e) => {
          const { target, currentTarget } = e;

          const rowsEls = currentTarget.querySelectorAll(':scope > thead > tr, :scope > tbody > tr');
          const rowIndex = [...rowsEls].findIndex(rowEl => rowEl.contains(target));
          if (rowIndex === -1) return;
          const cellEls = rowsEls[rowIndex].querySelectorAll(':scope > th, :scope > td');
          const columnIndex = [...cellEls].findIndex(cellEl => cellEl.contains(target));
          if (columnIndex === -1) return;

          const row = [...headerRows, ...bodyRows][rowIndex];
          const column = columns[columnIndex];
          onClick({ row, column, e });
        }}
      >
        <thead>
          {headerRows.map(row => (
            <TableRow
              key={row.id}
              row={row}
              columns={columns}
              cellTemplate={cellTemplate}
            />
          ))}
        </thead>
        <tbody>
          {bodyRows.map(row => (
            <TableRow
              key={row.id}
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
