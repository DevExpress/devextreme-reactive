import * as React from 'react';
import { Card } from 'reactstrap';
import {
  Column,
  FilteringState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSelection, IntegratedSorting,
  PagingState, SelectionState, SortingState, Table as TableBase, DataTypeProvider, DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser, DragDropProvider,
  Grid, GroupingPanel, PagingPanel,
  Table, TableColumnReordering, TableColumnVisibility, TableFilterRow, TableGroupRow,
  TableHeaderRow, TableSelection, Toolbar,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

interface ISale {
  product: string,
  region: string,
  amount: string,
  discount: string,
  saleDate: string,
  customer: string,
}

interface IGridState {
  columns: Column[],
  tableColumnExtensions: TableBase.ColumnExtension[],
  rows: ISale[],
  pageSizes: number[],
  currencyColumns: string[],
  percentColumns: string[],
}

const sales: ISale[] = generateRows({ columnValues: globalSalesValues, length: 1000 });

const availableFilterOperations : string[] = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

const getInputValue = (value?: string) : string =>
  (value === undefined ? '' : value);

const getPercentInputValue = (value) : string => (parseFloat(getInputValue(value)) * 100).toFixed(1);

const getColor = (amount: number) : string => {
  if (amount < 3000) {
    return '#fc7a76';
  }
  if (amount < 5000) {
    return '#ffb294';
  }
  if (amount < 8000) {
    return '#ffd59f';
  }
  return '#c3e2b7';
};

const CurrenceEditor = ({ onValueChange, value } : DataTypeProvider.ValueEditorProps) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        onValueChange(undefined);
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
    return (
      <input
        type="number"
        className="form-control text-right"
        placeholder="Filter..."
        value={getInputValue(value)}
        min={0}
        onChange={handleChange}
      />
    );
  }

const CurrencyFormatter: React.ComponentType<DataTypeProvider.ValueFormatterProps> =
  ({ value } : DataTypeProvider.ValueFormatterProps) => <span>${value}</span>;

const CurrencyTypeProvider: React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      editorComponent={CurrenceEditor}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);

const HighlightedCell : React.ComponentType<TableBase.DataCellProps> =
  ({ tableColumn, value, children } : TableBase.DataCellProps) => (
    <td
      style={{
        backgroundColor: getColor(value),
        textAlign: tableColumn.align,
      }}
    >
      {children}
    </td>
  );

const PercentEditor : React.ComponentType<DataTypeProvider.ValueEditorProps> =
({ value, onValueChange } : DataTypeProvider.ValueEditorProps) => {
  const handleChange = (event) => {
    if (event.target.value === '') {
      onValueChange(undefined);
      return;
    }
    const targetValue : number = Number(event.target.value) / 100;
    onValueChange(Math.min(Math.max(targetValue, 0), 1));
  };
  return (
    <input
      type="number"
      className="form-control text-right"
      placeholder="Filter..."
      value={getPercentInputValue(value)}
      step={0.1}
      min={0}
      max={100}
      onChange={handleChange}
    />
  );
};

const PercentTypeProvider: React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      editorComponent={PercentEditor}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);

const ProgressBarCell: React.ComponentType<TableBase.DataCellProps> =
  ({ value } : TableBase.DataCellProps) => {
    const percent : number = value * 100;
    return (
      <td style={{ position: 'relative', verticalAlign: 'inherit' }}>
        <div
          className="progress"
          style={{
            backgroundColor: 'transparent',
            borderRadius: 0,
            boxShadow: 'none',
            margin: 0,
          }}
        >
          <div
            aria-valuenow={parseInt(percent.toFixed(), 10)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            title={`${percent.toFixed(1)}%`}
          />
        </div>
      </td>
    );
};

const Cell: React.ComponentType<TableBase.DataCellProps> = (props: TableBase.DataCellProps) => {
  if (props.column.name === 'discount') {
    return <ProgressBarCell {...props} />;
  }
  if (props.column.name === 'amount') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

export default class Demo extends React.Component<object, IGridState> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      currencyColumns: ['amount'],
      pageSizes: [5, 10, 15],
      percentColumns: ['discount'],
      rows: sales,
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
    };
  }
  public render(): React.ReactNode {
    const {
      rows, columns, tableColumnExtensions, pageSizes,
      currencyColumns, percentColumns,
    } = this.state;

    return (
      <Card>
        <Grid
          rows={rows}
          columns={columns}
        >
          <FilteringState
            defaultFilters={[{ columnName: 'saleDate', value: '2016-02' }]}
          />
          <SortingState
            defaultSorting={[
              { columnName: 'product', direction: 'asc' },
              { columnName: 'saleDate', direction: 'asc' },
            ]}
          />

          <SelectionState />

          <GroupingState
            defaultGrouping={[{ columnName: 'product' }]}
            defaultExpandedGroups={['EnviroCare Max']}
          />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={10}
          />

          <IntegratedGrouping />
          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />

          <CurrencyTypeProvider for={currencyColumns} />
          <PercentTypeProvider for={percentColumns} />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
          />
          <TableSelection showSelectAll={true} />

          <TableColumnReordering defaultOrder={columns.map((column: Column) : string => column.name)} />
          <TableHeaderRow showSortingControls={true} />
          <TableFilterRow showFilterSelector={true} />
          <PagingPanel pageSizes={pageSizes} />

          <TableGroupRow />
          <TableColumnVisibility
            defaultHiddenColumnNames={['customer']}
          />
          <Toolbar />
          <GroupingPanel showSortingControls={true} />
          <ColumnChooser />
        </Grid>
      </Card>
    );
  }
}
