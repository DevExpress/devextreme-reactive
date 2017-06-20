import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import {
  DropTarget,
} from '@devexpress/dx-react-core';

import {
  tableRowKeyGetter,
  tableColumnKeyGetter,
  getTableCellInfo,
  findTableCellTarget,
  getTableColumnGeometries,
  getTableTargetColumnIndex,
} from '@devexpress/dx-grid-core';

const getColumnStyle = ({ column }) => ({
  width: column.width !== undefined ? `${column.width}px` : undefined,
});

const getRowStyle = ({ row }) => ({
  height: row.height !== undefined ? `${row.height}px` : undefined,
});

const renderRowCells = ({ row, columns, cellTemplate }) =>
  columns
    .filter((column, columnIndex) => !getTableCellInfo({ row, columns, columnIndex }).skip)
    .map((column, columnIndex) => React.cloneElement(
      cellTemplate({
        row,
        column,
        colspan: getTableCellInfo({ row, columns, columnIndex }).colspan,
        style: getColumnStyle({ column }),
      }),
      { key: tableColumnKeyGetter(column, columnIndex) },
    ));

const renderRows = ({
  rows,
  getRowId,
  columns,
  rowTemplate,
  cellTemplate,
}) =>
  rows
    .map((row, rowIndex) => React.cloneElement(
      rowTemplate({
        row,
        style: getRowStyle({ row }),
        children: renderRowCells({ row, columns, cellTemplate }),
      }),
      { key: tableRowKeyGetter(getRowId, row, rowIndex) },
    ));

const renderRowsBlock = ({
  rows,
  getRowId,
  columns,
  blockTemplate,
  rowTemplate,
  cellTemplate,
  onClick,
}) => blockTemplate({
  onClick: (e) => {
    const { rowIndex, columnIndex } = findTableCellTarget(e);
    if (rowIndex === -1 || columnIndex === -1) return;
    onClick({ e, row: rows[rowIndex], column: columns[columnIndex] });
  },
  children: renderRows({
    rows,
    getRowId,
    columns,
    rowTemplate,
    cellTemplate,
  }),
});

export class TableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    };

    this.tableNode = null;

    this.getColumns = () => {
      const { columns } = this.props;
      const { sourceColumnIndex, targetColumnIndex } = this.state;

      if (sourceColumnIndex === -1 || targetColumnIndex === -1) return columns;

      const result = columns.slice();

      const sourceColumn = columns[sourceColumnIndex];
      result.splice(sourceColumnIndex, 1);
      result.splice(targetColumnIndex, 0, sourceColumn);

      return result;
    };
    this.onOver = ({ payload, clientOffset }) => {
      const sourceColumnName = payload[0].columnName;
      // eslint-disable-next-line react/no-find-dom-node
      const tableRect = findDOMNode(this.tableNode).getBoundingClientRect();
      const columns = this.getColumns();
      const columnGeometries = getTableColumnGeometries(columns, tableRect.width);
      const targetColumnIndex = getTableTargetColumnIndex(
        columnGeometries,
        columns.findIndex(c => c.name === sourceColumnName),
        clientOffset.x - tableRect.left);

      if (targetColumnIndex === -1 || columns[targetColumnIndex].type) return;

      const { sourceColumnIndex } = this.state;
      this.setState({
        sourceColumnIndex: sourceColumnIndex === -1
          ? columns.findIndex(c => c.name === sourceColumnName)
          : sourceColumnIndex,
        targetColumnIndex,
      });
    };
    this.onLeave = () => {
      this.setState({
        sourceColumnIndex: -1,
        targetColumnIndex: -1,
      });
    };
    this.onDrop = () => {
      const { sourceColumnIndex, targetColumnIndex } = this.state;
      const { columns } = this.props;

      this.props.setColumnOrder({
        sourceColumnName: columns[sourceColumnIndex].name,
        targetColumnName: columns[targetColumnIndex].name,
      });
      this.setState({
        sourceColumnIndex: -1,
        targetColumnIndex: -1,
      });
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.columns !== nextProps.columns) {
      this.setState({
        sourceColumnIndex: -1,
        targetColumnIndex: -1,
      });
    }
  }
  render() {
    const {
      headerRows,
      rows,
      getRowId,
      minColumnWidth,
      tableTemplate,
      headTemplate,
      bodyTemplate,
      rowTemplate,
      cellTemplate,
      onClick,
      allowColumnReordering,
      className,
      style,
    } = this.props;
    const columns = this.getColumns();
    const minWidth = columns
      .map(column => column.width || minColumnWidth)
      .reduce((accum, width) => accum + width, 0);

    const table = tableTemplate({
      style: {
        tableLayout: 'fixed',
        minWidth: `${minWidth}px`,
      },
      ref: (node) => { if (node) this.tableNode = node; },
      children: [
        !headerRows.length ? null : React.cloneElement(
          renderRowsBlock({
            rows: headerRows,
            getRowId,
            columns,
            blockTemplate: headTemplate,
            rowTemplate,
            cellTemplate,
            onClick,
          }),
          { key: 'head' },
        ),
        React.cloneElement(
          renderRowsBlock({
            rows,
            getRowId,
            columns,
            blockTemplate: bodyTemplate,
            rowTemplate,
            cellTemplate,
            onClick,
          }),
          { key: 'body' },
        ),
      ],
    });

    return (
      <div
        className={className}
        style={{
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          ...style,
        }}
      >
        {allowColumnReordering ? (
          <DropTarget
            onOver={this.onOver}
            onLeave={this.onLeave}
            onDrop={this.onDrop}
          >
            {table}
          </DropTarget>
        ) : table }
      </div>
    );
  }
}

TableLayout.propTypes = {
  headerRows: PropTypes.array,
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  minColumnWidth: PropTypes.number,
  tableTemplate: PropTypes.func.isRequired,
  headTemplate: PropTypes.func,
  bodyTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  allowColumnReordering: PropTypes.bool,
  setColumnOrder: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableLayout.defaultProps = {
  headerRows: [],
  headTemplate: () => null,
  minColumnWidth: 120,
  onClick: () => {},
  allowColumnReordering: false,
  setColumnOrder: () => {},
  className: undefined,
  style: undefined,
};
