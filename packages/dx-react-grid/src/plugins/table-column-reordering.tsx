import * as React from 'react';
import {
  Getter,
  Plugin,
  Template,
  PlaceholderWithRef,
  TemplateConnector,
  DropTarget,
  withComponents,
  Getters,
} from '@devexpress/dx-react-core';
import {
  TABLE_DATA_TYPE,
  TABLE_REORDERING_TYPE,
  changeColumnOrder,
  getTableTargetColumnIndex,
  tableHeaderRowsWithReordering,
  draftOrder as draftOrderComputed,
  TargetColumnGeometry,
  TableColumn,
} from '@devexpress/dx-grid-core';
import { OrderedTableColumns } from './internal/ordered-table-columns';
import {
  Table as TableNS, CellDimensionsGetter, TableColumnReorderingProps,
  DragOverArgs, TableColumnReorderingState,
} from '../types';

const pluginDependencies = [
  { name: 'Table' },
  { name: 'DragDropProvider', optional: true },
];

const tableHeaderRowsComputed = (
  { tableHeaderRows }: Getters,
) => tableHeaderRowsWithReordering(tableHeaderRows);

// tslint:disable-next-line: max-line-length
class TableColumnReorderingRaw extends React.PureComponent<TableColumnReorderingProps, TableColumnReorderingState> {
  static defaultProps = {
    defaultOrder: [],
  };
  static components = {
    tableContainerComponent: 'TableContainer',
    rowComponent: 'Row',
    cellComponent: 'Cell',
  };
  cellDimensionGetters: { [colName: string]: CellDimensionsGetter } = {};
  cellDimensions: TargetColumnGeometry[] = [];
  onOver: (arg: DragOverArgs) => void;
  onLeave: () => void;
  onDrop: () => void;

  constructor(props) {
    super(props);

    this.state = {
      order: props.defaultOrder,
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    };

    this.onOver = this.handleOver.bind(this);
    this.onLeave = this.handleLeave.bind(this);
    this.onDrop = this.handleDrop.bind(this);
  }

  getState() {
    const { order: orderState } = this.state;
    const {
      order = orderState,
    } = this.props;
    return {
      ...this.state,
      order,
    };
  }

  getDraftOrder() {
    const { order, sourceColumnIndex, targetColumnIndex } = this.getState();
    return draftOrderComputed(order, sourceColumnIndex, targetColumnIndex);
  }

  getAvailableColumns() {
    return this.getDraftOrder()
      .filter(columnName => !!this.cellDimensionGetters[columnName]);
  }

  cacheCellDimensions() {
    this.cellDimensions = (this.cellDimensions
        && this.cellDimensions.length
        && this.cellDimensions.length === Object.keys(this.cellDimensionGetters).length
      )
      ? this.cellDimensions
      : this.getAvailableColumns()
        .map(columnName => this.cellDimensionGetters[columnName]());
  }

  resetCellDimensions() {
    this.cellDimensions = [];
  }

  ensureCellDimensionGetters(tableColumns: ReadonlyArray<TableColumn>) {
    Object.keys(this.cellDimensionGetters)
      .forEach((columnName) => {
        const columnIndex = tableColumns
          .findIndex(({ type, column }) => type === TABLE_DATA_TYPE && column!.name === columnName);
        if (columnIndex === -1) {
          delete this.cellDimensionGetters[columnName];
        }
      });
  }

// tslint:disable-next-line: max-line-length
  storeCellDimensionsGetter(tableColumn: Readonly<TableColumn>, getter: CellDimensionsGetter, tableColumns: ReadonlyArray<TableColumn>) {
    if (tableColumn.type === TABLE_DATA_TYPE) {
      this.cellDimensionGetters[tableColumn.column!.name] = getter;
    }
    this.ensureCellDimensionGetters(tableColumns);
  }

  handleOver({ payload, clientOffset: { x } }: DragOverArgs) {
    const sourceColumnName = payload[0].columnName;
    const availableColumns = this.getAvailableColumns();
    const relativeSourceColumnIndex = availableColumns.indexOf(sourceColumnName);

    if (relativeSourceColumnIndex === -1) return;

    this.cacheCellDimensions();
    const cellDimensions = this.cellDimensions;

    const relativeTargetIndex = getTableTargetColumnIndex(cellDimensions, x);

    if (relativeTargetIndex === -1) return;

    const {
      sourceColumnIndex: prevSourceColumnIndex,
      targetColumnIndex: prevTargetColumnIndex,
    } = this.getState();
    const draftOrder = this.getDraftOrder();
    const targetColumnIndex = draftOrder.indexOf(availableColumns[relativeTargetIndex]);

    if (targetColumnIndex === prevTargetColumnIndex) return;

    const sourceColumnIndex = prevSourceColumnIndex === -1
      ? draftOrder.indexOf(sourceColumnName)
      : prevSourceColumnIndex;

    this.setState({
      sourceColumnIndex,
      targetColumnIndex,
    });
  }

  handleLeave() {
    this.setState({
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    });

    this.resetCellDimensions();
  }

  handleDrop() {
    const { sourceColumnIndex, targetColumnIndex, order } = this.getState();
    const { onOrderChange } = this.props;

    if (sourceColumnIndex === -1 && targetColumnIndex === -1) return;

    const nextOrder = changeColumnOrder(order, {
      sourceColumnName: order[sourceColumnIndex],
      targetColumnName: order[targetColumnIndex],
    }) as string[];

    this.setState({
      order: nextOrder,
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    });

    if (onOrderChange) {
      onOrderChange(nextOrder);
    }

    this.resetCellDimensions();
  }

  render() {
    const {
      tableContainerComponent: Container,
      rowComponent: Row,
      cellComponent: Cell,
    } = this.props;

    this.cellDimensionGetters = {};

    return (
      <Plugin
        name="TableColumnReordering"
        dependencies={pluginDependencies}
      >
        <OrderedTableColumns order={this.getDraftOrder()} />

        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <Template name="table">
          {params => (
            <TemplateConnector>
              {({ draggingEnabled }) => (
                <Container
                  {...params}
                  onOver={this.onOver}
                  onLeave={this.onLeave}
                  onDrop={this.onDrop}
                  draggingEnabled={draggingEnabled}
                >
                  <PlaceholderWithRef />
                </Container>
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: Getters) => tableRow.type === TABLE_REORDERING_TYPE}
        >
          {params => (
            <Row {...params} />
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }: Getters) => tableRow.type === TABLE_REORDERING_TYPE}
        >
          {(params: TableNS.CellProps) => (
            <TemplateConnector>
              {({ tableColumns }: Getters) => (
                <Cell
                  {...params}
                  getCellDimensions={getter => this.storeCellDimensionsGetter(
                    params.tableColumn, getter, tableColumns,
                  )}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

const TableContainer = ({
  onOver, onLeave, onDrop, children, draggingEnabled,
}) => (
  draggingEnabled ? (
    <DropTarget
      onOver={onOver}
      onLeave={onLeave}
      onDrop={onDrop}
    >
      {children}
    </DropTarget>
  ) : children
);

/** A plugin that manages the displayed columns' order. */
export const TableColumnReordering: React.ComponentType<TableColumnReorderingProps>
  = withComponents({ TableContainer })(TableColumnReorderingRaw);
