import * as React from 'react';
import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
  Getters,
} from '@devexpress/dx-react-core';
import {
  isFixedTableRow,
  tableColumnsWithFixed,
  tableHeaderRowsWithFixed,
  tableHeaderColumnChainsWithFixed,
  calculateFixedColumnProps,
  isRowHighlighted,
} from '@devexpress/dx-grid-core';
import {
  TableCellProps, TableRowProps, TableFixedColumnsProps, TableFixedColumnsState,
} from '../types';

const tableHeaderRowsComputed = (
  { tableHeaderRows }: Getters,
) => tableHeaderRowsWithFixed(tableHeaderRows);
const tableHeaderColumnChainsComputed = (
  { tableColumns, tableHeaderRows, tableHeaderColumnChains }: Getters,
) => tableHeaderColumnChainsWithFixed(tableHeaderColumnChains, tableHeaderRows, tableColumns);

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

const pluginDependencies = [
  { name: 'Table' },
  { name: 'TableBandHeader', optional: true },
  { name: 'TableColumnReordering', optional: true },
  { name: 'TableEditColumn', optional: true },
  { name: 'TableEditRow', optional: true },
  { name: 'TableFilterRow', optional: true },
  { name: 'TableGroupRow', optional: true },
  { name: 'TableHeaderRow', optional: true },
  { name: 'TableRowDetail', optional: true },
  { name: 'TableSelection', optional: true },
  { name: 'TableSummaryRow', optional: true },
  { name: 'TableTreeColumn', optional: true },
];

// tslint:disable-next-line: max-line-length
class TableFixedColumnsBase extends React.PureComponent<TableFixedColumnsProps, TableFixedColumnsState> {
  static components = {
    cellComponent: 'Cell',
    listenerRowComponent: 'ListenerRow',
    listenerCellComponent: 'ListenerCell',
  };
  static defaultProps = {
    leftColumns: [],
    rightColumns: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      tableColumnDimensions: {},
    };
  }

  handleListenerSizeChange(key, width) {
    const { tableColumnDimensions } = this.state;
    if (tableColumnDimensions[key] !== width) {
      this.setState(state => ({
        tableColumnDimensions: {
          ...state.tableColumnDimensions,
          [key]: width,
        },
      }));
    }
  }

  render() {
    const {
      cellComponent: Cell,
      listenerRowComponent: ListenerRow,
      listenerCellComponent: ListenerCell,
    } = this.props;
    const leftColumns = this.props.leftColumns!;
    const rightColumns = this.props.rightColumns!;

    const tableColumnsComputed = ({ tableColumns }: Getters) => tableColumnsWithFixed(
      tableColumns,
      leftColumns,
      rightColumns,
    );

    return (
      <Plugin
        name="TableFixedColumns"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableHeaderColumnChains" computed={tableHeaderColumnChainsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableColumn }: any) => !!tableColumn.fixed}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({
                tableColumns, tableHeaderColumnChains, selection, focused, highlightSelectedRow,
              }) => {
                const selected = isRowHighlighted(highlightSelectedRow, selection,
                  params.tableRow, focused);
                const { tableColumnDimensions } = this.state;
                const fixedColumnProps = calculateFixedColumnProps(
                  params,
                  { leftColumns, rightColumns },
                  tableColumns,
                  tableColumnDimensions,
                  tableHeaderColumnChains,
                );

                return (
                  <Cell
                    {...params}
                    {...fixedColumnProps}
                    component={CellPlaceholder}
                    selected={selected}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isFixedTableRow(tableRow)}
        >
          {(params: TableRowProps) => (
            <ListenerRow {...params} />
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }: any) => !!isFixedTableRow(tableRow)}
        >
          {(params: TableCellProps) => (
            <ListenerCell
              {...params}
              listen={!!params.tableColumn.fixed}
              onSizeChange={({
                width,
              }) => this.handleListenerSizeChange(params.tableColumn.key, width)}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that enables you to fix columns to the left and right sides of the grid. */
export const TableFixedColumns: React.ComponentType<TableFixedColumnsProps> = TableFixedColumnsBase;
