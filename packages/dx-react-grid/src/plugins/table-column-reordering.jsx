import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  DropTarget,
  withComponents,
} from '@devexpress/dx-react-core';
import {
  TABLE_DATA_TYPE,
  TABLE_REORDERING_TYPE,
  orderedColumns,
  changeColumnOrder,
  getTableTargetColumnIndex,
  tableHeaderRowsWithReordering,
  draftOrder as draftOrderComputed,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'Table' },
  { name: 'DragDropProvider', optional: true },
];

const tableHeaderRowsComputed = (
  { tableHeaderRows },
) => tableHeaderRowsWithReordering(tableHeaderRows);

class TableColumnReorderingRaw extends React.PureComponent {
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
    this.cellDimensions = (this.cellDimensions && this.cellDimensions.length)
      ? this.cellDimensions
      : this.getAvailableColumns()
        .map(columnName => this.cellDimensionGetters[columnName]());
  }

  resetCellDimensions() {
    this.cellDimensions = [];
  }

  ensureCellDimensionGetters(tableColumns) {
    Object.keys(this.cellDimensionGetters)
      .forEach((columnName) => {
        const columnIndex = tableColumns
          .findIndex(({ type, column }) => type === TABLE_DATA_TYPE && column.name === columnName);
        if (columnIndex === -1) {
          delete this.cellDimensionGetters[columnName];
        }
      });
  }

  storeCellDimensionsGetter(tableColumn, getter, tableColumns) {
    if (tableColumn.type === TABLE_DATA_TYPE) {
      this.cellDimensionGetters[tableColumn.column.name] = getter;
    }
    this.ensureCellDimensionGetters(tableColumns);
  }

  handleOver({ payload, clientOffset: { x } }) {
    const sourceColumnName = payload[0].columnName;
    const availableColumns = this.getAvailableColumns();
    const relativeSourceColumnIndex = availableColumns.indexOf(sourceColumnName);

    if (relativeSourceColumnIndex === -1) return;

    this.cacheCellDimensions();
    const { cellDimensions } = this;

    const overlappedColumns = cellDimensions
      .filter(({ left, right }) => left <= x && x <= right);

    if (overlappedColumns.length > 1) return;

    const relativeTargetIndex = getTableTargetColumnIndex(
      cellDimensions,
      relativeSourceColumnIndex,
      x,
    );

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
    });

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

    const columnsComputed = (
      { tableColumns },
    ) => orderedColumns(tableColumns, this.getDraftOrder());

    this.cellDimensionGetters = {};

    return (
      <Plugin
        name="TableColumnReordering"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={columnsComputed} />
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
                  <TemplatePlaceholder />
                </Container>
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => tableRow.type === TABLE_REORDERING_TYPE}
        >
          {params => (
            <Row {...params} />
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }) => tableRow.type === TABLE_REORDERING_TYPE}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => (
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

TableColumnReorderingRaw.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string),
  defaultOrder: PropTypes.arrayOf(PropTypes.string),
  onOrderChange: PropTypes.func,
  tableContainerComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
};

TableColumnReorderingRaw.defaultProps = {
  order: undefined,
  defaultOrder: [],
  onOrderChange: undefined,
};

TableColumnReorderingRaw.components = {
  tableContainerComponent: 'TableContainer',
  rowComponent: 'Row',
  cellComponent: 'Cell',
};

const TableContainer = ({
  onOver, onLeave, onDrop, draggingEnabled, children, // eslint-disable-line react/prop-types
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

export const TableColumnReordering = withComponents({ TableContainer })(TableColumnReorderingRaw);
