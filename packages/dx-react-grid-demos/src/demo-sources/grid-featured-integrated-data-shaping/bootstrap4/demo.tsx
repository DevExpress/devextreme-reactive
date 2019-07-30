import * as React from 'react';
import {
  FilteringState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSelection, IntegratedSorting,
  PagingState, SelectionState, SortingState, DataTypeProvider, DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid, GroupingPanel, PagingPanel,
  Table, TableFilterRow, TableGroupRow,
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
  saleDate: string,
  customer: string,
}

const sales: ISale[] = generateRows({ columnValues: globalSalesValues, length: 1000 });

const availableFilterOperations : string[] = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

const getInputValue = (value?: string) : string =>
  (value === undefined ? '' : value);

const getColor = (amount: number) : string => {
  if (amount < 3000) {
    return '#e61d17';
  }
  if (amount < 5000) {
    return '#e05722';
  }
  if (amount < 8000) {
    return '#dacc11';
  }
  return '#34a209';
};

const CurrenceEditor: React.ComponentType<DataTypeProvider.ValueEditorProps> =
  ({ onValueChange, value } : DataTypeProvider.ValueEditorProps) => {
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
        className="form-control"
        placeholder="Filter..."
        value={getInputValue(value)}
        min={0}
        onChange={handleChange}
      />
    );
  };

const CurrencyFormatter: React.ComponentType<DataTypeProvider.ValueFormatterProps> =
  ({ value } : DataTypeProvider.ValueFormatterProps) => <i style={{ color: getColor(value) }}>${value}</i>;

const CurrencyTypeProvider: React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      editorComponent={CurrenceEditor}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);

export default () => {
  const [columns] = React.useState([
    { name: 'product', title: 'Product' },
    { name: 'region', title: 'Region' },
    { name: 'amount', title: 'Sale Amount' },
    { name: 'saleDate', title: 'Sale Date' },
    { name: 'customer', title: 'Customer' },
  ]);
  const [rows] = React.useState(sales);
  const [currencyColumns] = React.useState(['amount']);
  const [pageSizes] = React.useState([5, 10, 15]);

  return (
    <div>
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
        <PagingState />

        <IntegratedGrouping />
        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedPaging />
        <IntegratedSelection />

        <CurrencyTypeProvider for={currencyColumns} />

        <DragDropProvider />

        <Table />
        <TableSelection showSelectAll={true} />

        <TableHeaderRow showSortingControls={true} />
        <TableFilterRow showFilterSelector={true} />
        <PagingPanel pageSizes={pageSizes} />

        <TableGroupRow />
        <Toolbar />
        <GroupingPanel showSortingControls={true} />
      </Grid>
    </div>
  );
};
