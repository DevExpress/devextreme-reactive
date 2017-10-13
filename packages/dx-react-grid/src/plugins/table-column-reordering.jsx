// /* globals requestAnimationFrame */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  PluginContainer,
  Template,
  TemplatePlaceholder,
  DropTarget,
  TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  TABLE_DATA_TYPE,
  orderedColumns,
  changeColumnOrder,
  getTableTargetColumnIndex,
} from '@devexpress/dx-grid-core';

const TABLE_REORDERING_TYPE = 'reordering';

const pluginDependencies = [
  { pluginName: 'TableView' },
];

export class TableColumnReordering extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      order: props.defaultOrder || props.order,
      sourceColumnIndex: -1,
      targetColumnIndex: -1,
    };

    this.onOver = this.handleOver.bind(this);
    this.onLeave = this.handleLeave.bind(this);
    this.onDrop = this.handleDrop.bind(this);
  }
  getCellDimensions() {
    return this.getAvailableColumns()
      .map(columnName => this.cellDimensionGetters[columnName]());
  }
  getOrder() {
    const { sourceColumnIndex, targetColumnIndex, order } = this.state;

    if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
      const result = order.slice();
      const sourceColumn = order[sourceColumnIndex];
      result.splice(sourceColumnIndex, 1);
      result.splice(targetColumnIndex, 0, sourceColumn);
      return result;
    }

    return order;
  }
  getAvailableColumns() {
    return this.getOrder()
      .filter(columnName => !!this.cellDimensionGetters[columnName]);
  }
  storeCellDimensionsGetter(tableColumn, data) {
    if (tableColumn.type === TABLE_DATA_TYPE) {
      this.cellDimensionGetters[tableColumn.column.name] = data;
    }
  }
  handleOver({ payload, clientOffset }) {
    const sourceColumnName = payload[0].columnName;
    const availableColumns = this.getAvailableColumns();
    const relativeSourceColumnIndex = availableColumns.indexOf(sourceColumnName);

    if (relativeSourceColumnIndex === -1) return;

    const relativeTargetIndex = getTableTargetColumnIndex(
      this.getCellDimensions(),
      relativeSourceColumnIndex,
      clientOffset.x,
    );

    if (relativeTargetIndex === -1) return;

    const currentOrder = this.getOrder();
    const targetColumnIndex = currentOrder.indexOf(availableColumns[relativeTargetIndex]);

    if (targetColumnIndex === this.state.targetColumnIndex) return;

    const { sourceColumnIndex: prevSourceColumnIndex } = this.state;
    const sourceColumnIndex = prevSourceColumnIndex === -1
      ? currentOrder.indexOf(sourceColumnName)
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
  }
  handleDrop() {
    const { sourceColumnIndex, targetColumnIndex, order } = this.state;
    const { onOrderChange } = this.props;
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
  }
  render() {
    const { reorderingRowTemplate, reorderingCellTemplate } = this.props;
    const order = this.getOrder();
    const columnsComputed = ({ tableColumns }) => orderedColumns(tableColumns, order);
    const tableHeaderRowsWithReordering = ({ tableHeaderRows }) => [
      {
        key: TABLE_REORDERING_TYPE,
        type: TABLE_REORDERING_TYPE,
      },
      ...tableHeaderRows,
    ];

    this.cellDimensionGetters = {};

    return (
      <PluginContainer
        pluginName="TableColumnReordering"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={columnsComputed} />
        <Getter name="tableHeaderRows" computed={tableHeaderRowsWithReordering} />
        <Template name="tableView">
          <DropTarget
            onOver={this.onOver}
            onLeave={this.onLeave}
            onDrop={this.onDrop}
          >
            <TemplatePlaceholder />
          </DropTarget>
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => tableRow.type === TABLE_REORDERING_TYPE}
        >
          {params => (
            <TemplateRenderer
              template={reorderingRowTemplate}
              params={params}
            />
          )}
        </Template>
        <Template
          name="tableViewCell"
          predicate={({ tableRow }) => tableRow.type === TABLE_REORDERING_TYPE}
        >
          {({ tableColumn }) => {
            const cellDimensionsGetter = fn => this.storeCellDimensionsGetter(tableColumn, fn);
            return (
              <TemplateRenderer
                template={reorderingCellTemplate}
                params={{
                  getCellDimension: cellDimensionsGetter,
                }}
              />
            );
          }}
        </Template>
      </PluginContainer>
    );
  }
}

TableColumnReordering.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string),
  defaultOrder: PropTypes.arrayOf(PropTypes.string),
  onOrderChange: PropTypes.func,
  reorderingRowTemplate: PropTypes.func.isRequired,
  reorderingCellTemplate: PropTypes.func.isRequired,
};

TableColumnReordering.defaultProps = {
  order: undefined,
  defaultOrder: undefined,
  onOrderChange: undefined,
};
