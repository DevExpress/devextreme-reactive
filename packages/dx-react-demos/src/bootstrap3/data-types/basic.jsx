import React from 'react';
import {
  DataTypeProvider,
  FilteringState,
  LocalFiltering,
  EditingState,
  GroupingState,
  LocalGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
  TableGroupRow,
  GroupingPanel,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const CurrencyTypeProvider = () => (
  <DataTypeProvider
    type="currency"
    formatterTemplate={({ value }) => (
      <span><b className="text-muted">$</b>{value}</span>
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
const NameTypeProvider = () => (
  <DataTypeProvider
    type="customerName"
    formatterTemplate={({ value }) => (
      <b className="text-danger">{value}</b>
    )}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'customer', title: 'Customer', dataType: 'customerName' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'amount', title: 'Sale Amount', dataType: 'currency', align: 'right' },
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
        <NameTypeProvider />
        <FilteringState defaultFilters={[]} />
        <LocalFiltering />
        <EditingState onCommitChanges={this.commitChanges} />
        <GroupingState
          defaultGrouping={[{ columnName: 'customer' }]}
          defaultExpandedGroups={['Beacon Systems', 'Apollo Inc', 'Renewable Supplies']}
        />
        <LocalGrouping />
        <TableView />
        <TableHeaderRow allowGroupingByClick />
        <TableFilterRow />
        <TableEditRow />
        <TableEditColumn allowAdding allowEditing allowDeleting />
        <TableGroupRow />
        <GroupingPanel allowUngroupingByClick />
      </Grid>
    );
  }
}
