/* globals requestAnimationFrame */

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  DropTarget,
  TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  TABLE_DATA_TYPE,
  getTableColumnGeometries,
  getTableTargetColumnIndex,
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
} from '@devexpress/dx-grid-core';

import { RowsBlockLayout } from './table-layout/rows-block-layout';

const TABLE_FLEX_TYPE = 'flex';

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
      const { sourceColumnIndex, targetColumnIndex, animationState } = this.state;

      let result = columns;

      const isFixedWidth = columns.filter(column => column.width === undefined).length === 0;
      if (isFixedWidth) {
        result = result.slice();
        result.push({ key: TABLE_FLEX_TYPE, type: TABLE_FLEX_TYPE });
      }

      if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
        result = result.slice();
        const sourceColumn = columns[sourceColumnIndex];
        result.splice(sourceColumnIndex, 1);
        result.splice(targetColumnIndex, 0, sourceColumn);
      }

      if (animationState.size) {
        result = result
          .map(column => (animationState.has(column.key)
            ? { ...column, animationState: animationState.get(column.key) }
            : column));
      }

      return result;
    };
    this.onOver = ({ payload, clientOffset }) => {
      const sourceColumnName = payload[0].columnName;
      const tableRect = this.tableRect();
      const columns = this.getColumns();
      const columnGeometries = getTableColumnGeometries(columns, tableRect.width);
      let targetColumnIndex = getTableTargetColumnIndex(
        columnGeometries,
        columns.findIndex(column =>
          column.type === TABLE_DATA_TYPE && column.column.name === sourceColumnName),
        clientOffset.x - tableRect.left);

      if (targetColumnIndex === -1 ||
        targetColumnIndex === this.state.targetColumnIndex) return;

      if (columns[targetColumnIndex].type !== TABLE_DATA_TYPE) {
        targetColumnIndex = columns.findIndex(column => column.type === TABLE_DATA_TYPE);
      }

      const { sourceColumnIndex } = this.state;
      this.setState({
        sourceColumnIndex: sourceColumnIndex === -1
          ? columns.findIndex(column =>
            column.type === TABLE_DATA_TYPE && column.column.name === sourceColumnName)
          : sourceColumnIndex,
        targetColumnIndex,
      });

      this.animations = getAnimations(columns, this.getColumns(), tableRect.width,
        this.props.columns[this.state.sourceColumnIndex].key, this.animations);
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

      if (sourceColumnIndex === -1) return;

      this.animations = getAnimations(columns, this.getColumns(), tableRect.width,
        this.props.columns[sourceColumnIndex].key, this.animations);
      this.processAnimationFrame();
    };
    this.onDrop = () => {
      const { sourceColumnIndex, targetColumnIndex } = this.state;
      const { columns } = this.props;

      this.props.setColumnOrder({
        sourceColumnName: columns[sourceColumnIndex].column.name,
        targetColumnName: columns[targetColumnIndex].column.name,
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
      minColumnWidth,
      tableTemplate,
      headTemplate,
      bodyTemplate,
      rowTemplate,
      cellTemplate,
      allowColumnReordering,
      className,
      style,
    } = this.props;
    const columns = this.getColumns();
    const minWidth = columns
      .map(column => column.width || (column.type === TABLE_FLEX_TYPE ? 0 : minColumnWidth))
      .reduce((accum, width) => accum + width, 0);

    const table = (
      <TemplateRenderer
        template={tableTemplate}
        params={{
          ref: (node) => { if (node) this.tableNode = node; },
          style: {
            tableLayout: 'fixed',
            minWidth: `${minWidth}px`,
          },
        }}
      >
        {[
          ...(!headerRows.length
            ? []
            : [(
              <RowsBlockLayout
                key="head"
                rows={headerRows}
                columns={columns}
                blockTemplate={headTemplate}
                rowTemplate={rowTemplate}
                cellTemplate={cellTemplate}
              />
            )]
          ),
          <RowsBlockLayout
            key="body"
            rows={rows}
            columns={columns}
            blockTemplate={bodyTemplate}
            rowTemplate={rowTemplate}
            cellTemplate={cellTemplate}
          />,
        ]}
      </TemplateRenderer>
    );

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
  columns: PropTypes.array.isRequired,
  minColumnWidth: PropTypes.number,
  tableTemplate: PropTypes.func.isRequired,
  headTemplate: PropTypes.func,
  bodyTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  allowColumnReordering: PropTypes.bool,
  setColumnOrder: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableLayout.defaultProps = {
  headerRows: [],
  headTemplate: () => null,
  minColumnWidth: 120,
  allowColumnReordering: false,
  setColumnOrder: () => {},
  className: undefined,
  style: undefined,
};
