import React from 'react';
import {
  DataGrid,
  FilteringState,
  LocalFiltering,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import {
  generateRows,
} from '../../demoData';

export class CustomFilterRowDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 14 }),
    };
  }
  render() {
    const { rows, columns } = this.state;

    return (
      <DataGrid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[]} />
        <LocalFiltering
          filterFn={(row, filter) => {
            const toLowerCase = value => String(value).toLowerCase();

            if (filter.column === 'sex') {
              return toLowerCase(row[filter.column]) === toLowerCase(filter.value);
            }
            return toLowerCase(row[filter.column]).indexOf(toLowerCase(filter.value)) > -1;
          }}
        />
        <TableView />
        <TableHeaderRow />
        <TableFilterRow
          filterCellTemplate={({ column, filter, changeFilter }) => {
            if (column.name === 'sex') {
              return (
                <td>
                  <select
                    className="form-control"
                    value={filter ? filter.value : ''}
                    onChange={e => changeFilter(e.target.value ? { value: e.target.value } : null)}
                  >
                    <option value="" />
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </td>
              );
            }

            return undefined;
          }}
        />
      </DataGrid>
    );
  }
}
