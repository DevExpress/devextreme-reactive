import React from 'react';
import PropTypes from 'prop-types';
import {
  DataTypeProvider,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const getRowId = row => row.id;

const BooleanFormatter = ({ value }) =>
  <span className="label label-default">{value ? 'Yes' : 'No'}</span>;

BooleanFormatter.propTypes = {
  value: PropTypes.bool.isRequired,
};

const BooleanEditor = ({ value, onValueChange }) => (
  <select
    className="form-control"
    value={value}
    onChange={e => onValueChange(e.target.value === 'true')}
  >
    <option value={false}>No</option>
    <option value>Yes</option>
  </select>
);

BooleanEditor.propTypes = {
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

const BooleanTypeProvider = () => (
  <DataTypeProvider
    type="boolean"
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
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
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 14,
      }),
    };

    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
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
        getRowId={getRowId}
      >
        <BooleanTypeProvider />
        <EditingState
          onCommitChanges={this.commitChanges}
          defaultEditingRows={[0]}
        />
        <Table />
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
