import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  isFixedTableRow,
  tableColumnsWithFixed,
  tableHeaderRowsWithFixed,
  tableHeaderColumnChainsWithFixed,
  calculateFixedColumnProps,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableHeaderRowsWithFixed(tableHeaderRows);
const tableHeaderColumnChainsComputed = ({
  tableColumns, tableHeaderRows, tableHeaderColumnChains,
}) => tableHeaderColumnChainsWithFixed(tableHeaderColumnChains, tableHeaderRows, tableColumns);

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

export class TableFixedColumns extends React.PureComponent {
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
      leftColumns,
      rightColumns,
      cellComponent: Cell,
      listenerRowComponent: ListenerRow,
      listenerCellComponent: ListenerCell,
    } = this.props;

    const tableColumnsComputed = ({ tableColumns }) => tableColumnsWithFixed(
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
          predicate={({ tableColumn }) => !!tableColumn.fixed}
        >
          {params => (
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
          predicate={({ tableRow }) => isFixedTableRow(tableRow)}
        >
          {params => (
            <ListenerRow {...params} />
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }) => isFixedTableRow(tableRow)}
        >
          {params => (
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

TableFixedColumns.propTypes = {
  leftColumns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.symbol])),
  rightColumns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.symbol])),
  cellComponent: PropTypes.func.isRequired,
  listenerRowComponent: PropTypes.func.isRequired,
  listenerCellComponent: PropTypes.func.isRequired,
};

TableFixedColumns.defaultProps = {
  leftColumns: [],
  rightColumns: [],
};

TableFixedColumns.components = {
  cellComponent: 'Cell',
  listenerRowComponent: 'ListenerRow',
  listenerCellComponent: 'ListenerCell',
};
