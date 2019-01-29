import * as React from 'react';
import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
  Getters,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  isFixedTableRow,
  tableColumnsWithFixed,
  tableHeaderRowsWithFixed,
  tableHeaderColumnChainsWithFixed,
  calculateFixedColumnProps,
} from '@devexpress/dx-grid-core';
import { TableFixedColumnsProps, TableFixedColumnsState } from '../types/table-fixed-columns.types';
import { CellProps, RowProps } from '../types';

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
  { name: 'TableHeaderRow', optional: true },
  { name: 'TableSelection', optional: true },
  { name: 'TableSummaryRow', optional: true },
  { name: 'TableTreeColumn', optional: true },
];

// tslint:disable-next-line: max-line-length
export class TableFixedColumns extends React.PureComponent<TableFixedColumnsProps, TableFixedColumnsState> {
  static components: PluginComponents;
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
    this.setState(state => ({
      tableColumnDimensions: {
        ...state.tableColumnDimensions,
        [key]: width,
      },
    }));
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
          {(params: CellProps) => (
            <TemplateConnector>
              {({ tableColumns, tableHeaderColumnChains }) => {
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
          {(params: RowProps) => (
            <ListenerRow {...params} />
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }: any) => !!isFixedTableRow(tableRow)}
        >
          {(params: CellProps) => (
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

TableFixedColumns.components = {
  cellComponent: 'Cell',
  listenerRowComponent: 'ListenerRow',
  listenerCellComponent: 'ListenerCell',
};
