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
  const { row, columns, getCellInfo, cellContentTemplate,
    isHeader, highlightSelected } = props;

  const height = (!row.height || row.height === 'auto') ? 'auto' : `${row.height}px`;

  return (
    <tr
      className={highlightSelected && row.selected ? 'active' : ''}
      style={{ height }}
    >
      {columns.map((column, columnIndex) => {
        const info = getCellInfo({ row, column, columnIndex, columns });
        if (info.skip) return null;
        return (
          <TableCell
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
  highlightSelected: React.PropTypes.bool.isRequired,
  row: React.PropTypes.object.isRequired,
  columns: React.PropTypes.array.isRequired,
  getCellInfo: React.PropTypes.func.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
  isHeader: React.PropTypes.bool,
};

TableRow.defaultProps = {
  isHeader: false,
};

/* eslint-disable */
const closest = (el, s) => {
  const matches = (el.document || el.ownerDocument).querySelectorAll(s);
  let i;
  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {};
  } while ((i < 0) && (el = el.parentElement));
  return el;
};
/* eslint-enable */

export const Table = (props) => {
  const { headerRows, bodyRows, columns, cellContentTemplate,
        getCellInfo, highlightSelected, onClick } = props;

  return (
    <div className="table-responsive">
      <table
        className="table"
        onClick={(e) => {
          const { target } = e;
          const cell = closest(target, 'th') || closest(target, 'td');
          if (!cell) return;

          const { rowId, columnName } = JSON.parse(cell.getAttribute('data-cell'));
          onClick({ rowId, columnName, e });
        }}
      >
        <thead>
          {headerRows.map(row => (
            <TableRow
              key={row.id}
              row={row}
              columns={columns}
              cellContentTemplate={cellContentTemplate}
              getCellInfo={getCellInfo}
              highlightSelected={highlightSelected}
              isHeader
            />
          ))}
        </thead>
        <tbody>
          {bodyRows.map(row => (
            <TableRow
              key={row.id}
              row={row}
              columns={columns}
              cellContentTemplate={cellContentTemplate}
              getCellInfo={getCellInfo}
              highlightSelected={highlightSelected}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
Table.defaultProps = {
  highlightSelected: false,
  onClick: () => {},
};
Table.propTypes = {
  highlightSelected: React.PropTypes.bool,
  headerRows: React.PropTypes.array.isRequired,
  bodyRows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  getCellInfo: React.PropTypes.func.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func,
};
