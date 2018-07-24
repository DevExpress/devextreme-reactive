import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
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
} from '@devexpress/dx-react-grid-material-ui';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

type EditorProps = DataTypeProvider.ValueEditorProps & WithStyles<typeof styles>;
type HighlightedCellProps = TableBase.DataCellProps & WithStyles<typeof styles>;
type ProgressBarCellProps = TableBase.DataCellProps & WithStyles<typeof styles>;

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

const availableFilterOperations: string[] = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

const styles = (theme: Theme) => createStyles({
  highlightedCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  numericInput: {
    textAlign: 'right',
    width: '100%',
  },
  progressBar: {
    backgroundColor: theme.palette.primary.light,
    float: 'left',
    height: theme.spacing.unit,
  },
  progressBarCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

const getInputValue = (value?: string) : string =>
  (value === undefined ? '' : value);

const getPercentInputValue = (value) : string => (parseFloat(getInputValue(value)) * 100).toFixed(1);

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

const CurrencyEditor = withStyles(styles)(
  ({ onValueChange, classes, value } : EditorProps) => {
    const handleChange = (event) => {
      const { value: targetValue } = event.target;
      if (targetValue.trim() === '') {
        onValueChange(undefined);
        return;
      }
      onValueChange(parseInt(targetValue, 10));
    };
    return (
      <Input
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
  }
);

const CurrencyFormatter: React.ComponentType<DataTypeProvider.ValueFormatterProps> =
  ({ value } : DataTypeProvider.ValueFormatterProps) => <span>${value}</span>;

const CurrencyTypeProvider: React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      editorComponent={CurrencyEditor}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);

const PercentEditor = withStyles(styles)(
  ({ value, onValueChange, classes } : EditorProps) => {
    const handleChange = (event) => {
      if (event.target.value === '') {
        onValueChange(undefined);
        return;
      }
      const targetValue : number = Number(event.target.value) / 100;
      onValueChange(Math.min(Math.max(targetValue, 0), 1));
    };
    return (
      <Input
        type="number"
        classes={{
          input: classes.numericInput,
        }}
        fullWidth={true}
        value={getPercentInputValue(value)}
        inputProps={{
          max: 100,
          min: 0,
          placeholder: 'Filter...',
          step: 0.1,
        }}
        onChange={handleChange}
      />
    );
  }
);

const PercentTypeProvider: React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      editorComponent={PercentEditor}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);

const HighlightedCell = withStyles(styles, { name: 'HighlightedCell' })(
  ({
    tableColumn, value, classes, children,
  } : HighlightedCellProps) => (
    <TableCell
      className={classes.highlightedCell}
      style={{
        color: getColor(value),
        textAlign: tableColumn.align,
      }}
    >
      {children}
    </TableCell>
  )
);

const ProgressBarCell = withStyles(styles, { name: 'ProgressBarCell' })(
  ({ value, classes } : ProgressBarCellProps) => {
    const percent : number = value * 100;
    return (
      <TableCell
        className={classes.progressBarCell}
      >
        <div
          className={classes.progressBar}
          style={{ width: `${percent}%` }}
          title={`${percent.toFixed(1)}%`}
        />
      </TableCell>
    );
  }
);

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
      </Paper>
    );
  }
}
