import React from 'react';

export const TableCell = (props) => {
  const { row, column, colspan, cellContentTemplate, isHeader } = props;
  const TagName = isHeader ? 'th' : 'td';

  return (
    <TagName
      style={{
        width: column.width ? `${column.width}px` : 'auto',
      }}
      colSpan={colspan}
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
  const { row, columns, getCellInfo, cellContentTemplate, cellTemplate, isHeader } = props;
  const TableCellTemplate = cellTemplate;

  const height = (!row.height || row.height === 'auto') ? 'auto' : `${row.height}px`;

  return (
    <tr style={{ height }}>
      {columns.map((column, columnIndex) => {
        const info = getCellInfo({ row, column, columnIndex, columns });
        if (info.skip) return null;
        return (
          <TableCellTemplate
            key={column.name}
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
  cellTemplate: React.PropTypes.func.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
  isHeader: React.PropTypes.bool,
};

TableRow.defaultProps = {
  isHeader: false,
};

export const Table = (props) => {
  const { headerRows, bodyRows, columns, cellContentTemplate,
        cellTemplate, rowTemplate, getCellInfo } = props;

  const TableRowTemplate = rowTemplate;

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }} className="table">
      <thead>
        {headerRows.map(row =>
          <TableRowTemplate
            key={row.id}
            row={row}
            columns={columns}
            cellContentTemplate={cellContentTemplate}
            cellTemplate={cellTemplate}
            getCellInfo={getCellInfo}
            isHeader
          />,
        )}
      </thead>
      <tbody>
        {bodyRows.map(row =>
          <TableRowTemplate
            key={row.id}
            row={row}
            columns={columns}
            cellContentTemplate={cellContentTemplate}
            cellTemplate={cellTemplate}
            getCellInfo={getCellInfo}
          />,
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  headerRows: React.PropTypes.array.isRequired,
  bodyRows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  getCellInfo: React.PropTypes.func.isRequired,
  rowTemplate: React.PropTypes.func.isRequired,
  cellTemplate: React.PropTypes.func.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
};
