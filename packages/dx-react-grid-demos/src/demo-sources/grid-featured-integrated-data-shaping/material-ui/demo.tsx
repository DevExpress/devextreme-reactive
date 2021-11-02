import * as React from 'react';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import {
  Column,
  FilteringState, GroupingState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSelection, IntegratedSorting,
  PagingState, SelectionState, SortingState, DataTypeProvider, DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid, GroupingPanel, PagingPanel,
  Table, TableFilterRow, TableGroupRow,
  TableHeaderRow, TableSelection, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

type CurrencyFormatterProps = DataTypeProvider.ValueFormatterProps;
type CurrencyEditorProps = DataTypeProvider.ValueEditorProps;

interface ISale {
  product: string,
  region: string,
  amount: string,
  saleDate: string,
  customer: string,
}

const sales: ISale[] = generateRows({ columnValues: globalSalesValues, length: 1000 });

const availableFilterOperations: string[] = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

const PREFIX = 'Demo';
const classes = {
  currency: `${PREFIX}-currency`,
  numericInput: `${PREFIX}-numericInput`,
};
const StyledInput = styled(Input)(() => ({
  [`& .${classes.numericInput}`]: {
    fontSize: '14px',
    width: '100%',
  },
}));
const StyledI = styled('i')(({ theme }) => ({
  [`& .${classes.currency}`]: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const getInputValue = (value?: string) : string => (value === undefined ? '' : value);

const getColor = (amount: number) : string => {
  if (amount < 3000) {
    return '#F44336';
  }
  if (amount < 5000) {
    return '#FFC107';
  }
  if (amount < 8000) {
    return '#FF5722';
  }
  return '#009688';
};

const CurrencyEditor = ({ onValueChange, value } : CurrencyEditorProps) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange(undefined);
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <StyledInput
      type="number"
      classes={{
        input: classes.numericInput,
      }}
      fullWidth={true}
      value={getInputValue(value)}
      inputProps={{
        min: 0,
        placeholder: 'Filter...',
      }}
      onChange={handleChange}
    />
  );
};

const CurrencyFormatter = ({ value } : CurrencyFormatterProps) => (
  <StyledI className={classes.currency} style={{ color: getColor(value) }}>
    {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
  </StyledI>
);

const CurrencyTypeProvider: React.ComponentType<DataTypeProviderProps> = (
  props: DataTypeProviderProps,
) => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    editorComponent={CurrencyEditor}
    availableFilterOperations={availableFilterOperations}
    {...props}
  />
);

export default () => {
  const [columns] = React.useState<Column[]>([
    { name: 'product', title: 'Product' },
    { name: 'region', title: 'Region' },
    { name: 'amount', title: 'Sale Amount' },
    { name: 'saleDate', title: 'Sale Date' },
    { name: 'customer', title: 'Customer' },
  ]);
  const [rows] = React.useState<ISale[]>(sales);
  const [pageSizes] = React.useState<number[]>([5, 10, 15]);
  const [currencyColumns] = React.useState<string[]>(['amount']);

  return (
    <Paper>
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
    </Paper>
  );
};
