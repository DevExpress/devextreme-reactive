import React from 'react';
import {
  DataTypeProvider,
  FilteringState,
  LocalFiltering,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const CurrencyTypeProvider = () => (
  <DataTypeProvider
    type="currency"
    formatterTemplate={({ value }) => (
      <div className="text-right">
        <b className="text-muted">$</b>{value}
      </div>
    )}
    editorTemplate={({ value, onValueChange }) => (
      <input
        type="text"
        className="form-control text-right"
        placeholder="$"
        value={value}
        onChange={e => onValueChange(e.target.value)}
      />
    )}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'amount', title: 'Sale Amount', dataType: 'currency' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 14 }),
    };

    this.commitChanges = ({ added, changed, deleted }) => {
      let rows = this.state.rows;
      if (added) {
        const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        rows = rows.filter(row => !deletedSet.has(row.id));
      }
      this.setState({ rows });
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider />
        <FilteringState defaultFilters={[]} />
        <LocalFiltering />
        <EditingState onCommitChanges={this.commitChanges} />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow />
        <TableEditRow />
        <TableEditColumn allowAdding allowEditing allowDeleting />
      </Grid>
    );
  }
}
