/* globals requestAnimationFrame */

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
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
} from '@devexpress/dx-grid-core';

const FLEX_TYPE = 'flex';

const getColumnStyle = ({ column, animationState = {} }) => ({
  width: column.width !== undefined ? `${column.width}px` : undefined,
  ...animationState,
});

const getRowStyle = ({ row }) => ({
  height: row.height !== undefined ? `${row.height}px` : undefined,
});

const renderRowCells = ({ row, columns, cellTemplate, animationState }) =>
  columns
    .filter((column, columnIndex) => !getTableCellInfo({ row, columns, columnIndex }).skip)
    .map((column, columnIndex) => {
      const key = tableColumnKeyGetter(column, columnIndex);
      const colspan = getTableCellInfo({ row, columns, columnIndex }).colspan;
      return React.cloneElement(
        cellTemplate({
          row,
          column,
          ...colspan ? { colspan } : null,
          style: getColumnStyle({ column, animationState: animationState.get(key) }),
        }),
        { key },
      );
    });

const renderRows = ({
  rows,
  getRowId,
  columns,
  rowTemplate,
  cellTemplate,
  animationState,
}) =>
  rows
    .map((row, rowIndex) => React.cloneElement(
      rowTemplate({
        row,
        style: getRowStyle({ row }),
        children: renderRowCells({ row, columns, cellTemplate, animationState }),
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
  animationState,
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
    animationState,
  }),
});

export class TableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sourceColumnIndex: -1,
      targetColumnIndex: -1,

      animationState: new Map(),
    };

    this.animations = new Map();

    this.tableNode = null;
    // eslint-disable-next-line react/no-find-dom-node
    this.tableRect = () => findDOMNode(this.tableNode).getBoundingClientRect();

    this.getColumns = () => {
      const { columns } = this.props;
      const { sourceColumnIndex, targetColumnIndex } = this.state;

      let result = columns;

      const isFixedWidth = columns.filter(column => column.width === undefined).length === 0;
      if (isFixedWidth) {
        result = result.slice();
        result.push({ type: FLEX_TYPE });
      }

      if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
        result = result.slice();
        const sourceColumn = columns[sourceColumnIndex];
        result.splice(sourceColumnIndex, 1);
        result.splice(targetColumnIndex, 0, sourceColumn);
      }

      return result;
    };
    this.onOver = ({ payload, clientOffset }) => {
      const sourceColumnName = payload[0].columnName;
      const tableRect = this.tableRect();
      const columns = this.getColumns();
      const columnGeometries = getTableColumnGeometries(columns, tableRect.width);
      const targetColumnIndex = getTableTargetColumnIndex(
        columnGeometries,
        columns.findIndex(c => c.name === sourceColumnName),
        clientOffset.x - tableRect.left);

      if (targetColumnIndex === -1 ||
        columns[targetColumnIndex].type ||
        targetColumnIndex === this.state.targetColumnIndex) return;

      const { sourceColumnIndex } = this.state;
      this.setState({
        sourceColumnIndex: sourceColumnIndex === -1
          ? columns.findIndex(c => c.name === sourceColumnName)
          : sourceColumnIndex,
        targetColumnIndex,
      });

      this.animations = getAnimations(columns, this.getColumns(), tableRect.width,
        tableColumnKeyGetter(this.props.columns[this.state.sourceColumnIndex]), this.animations);
      this.processAnimationFrame();
    };
    this.onLeave = () => {
      const columns = this.getColumns();
      const tableRect = this.tableRect();

      const sourceColumnIndex = this.state.sourceColumnIndex;

      this.setState({
        sourceColumnIndex: -1,
        targetColumnIndex: -1,
      });

      this.animations = getAnimations(columns, this.getColumns(), tableRect.width,
        tableColumnKeyGetter(this.props.columns[sourceColumnIndex]), this.animations);
      this.processAnimationFrame();
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
  processAnimationFrame() {
    this.animations = filterActiveAnimations(this.animations);

    if (!this.animations.size) {
      if (this.state.animationState.size) {
        this.setState({ animationState: new Map() });
      }
      return;
    }

    const animationState = evalAnimations(this.animations);
    this.setState({ animationState });

    requestAnimationFrame(this.processAnimationFrame.bind(this));
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
    const { animationState } = this.state;
    const columns = this.getColumns();
    const minWidth = columns
      .map(column => column.width || (column.type === FLEX_TYPE ? 0 : minColumnWidth))
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
            animationState,
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
            animationState,
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
