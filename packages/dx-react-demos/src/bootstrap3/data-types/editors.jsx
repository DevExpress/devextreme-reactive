import React from 'react';
import {
  DataTypeProvider,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateData,
  globalSalesValues,
} from '../../demo-data/generator';

const BooleanTypeProvider = () => (
  <DataTypeProvider
    type="boolean"
    formatterTemplate={({ value }) =>
      <span className="label label-default">{value ? 'Yes' : 'No'}</span>}
    editorTemplate={({ value, onValueChange }) => (
      <select
        className="form-control"
        value={value}
        onChange={e => onValueChange(e.target.value === 'true')}
      >
        <option value={false}>No</option>
        <option value>Yes</option>
      </select>
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
        { name: 'units', title: 'Units' },
        { name: 'shipped', title: 'Shipped', dataType: 'boolean' },
      ],
      data: generateData({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 14,
      }),
    };

    this.commitChanges = ({ added, changed, deleted }) => {
      let data = this.state.data;
      if (added) {
        const startingAddedId = (data.length - 1) > 0 ? data[data.length - 1].id + 1 : 0;
        data = [
          ...data,
          ...added.map((rowData, index) => ({
            id: startingAddedId + index,
            ...rowData,
          })),
        ];
      }
      if (changed) {
        data = data.map(rowData =>
          (changed[rowData.id] ? { ...rowData, ...changed[rowData.id] } : rowData));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        data = data.filter(rowData => !deletedSet.has(rowData.id));
      }
      this.setState({ data });
    };
  }
  render() {
    const { data, columns } = this.state;

    return (
      <Grid
        data={data}
        columns={columns}
        getRowDataId={rowData => rowData.id}
      >
        <BooleanTypeProvider />
        <EditingState
          onCommitChanges={this.commitChanges}
          defaultEditingRows={[0]}
        />
        <TableView />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          allowAdding
          allowEditing
          allowDeleting
        />
      </Grid>
    );
  }
}
