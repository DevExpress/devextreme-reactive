import React from 'react';
import {
  DataGrid,
  SortingState,
} from '@devexpress/dx-react-datagrid';
import {
  VirtualTableView,
  TableHeaderRow,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import { Loading } from '../components/loading';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export class RemoteSortingDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'OrderNumber', title: 'Order Number' },
        { name: 'OrderDate', title: 'Order Date' },
        { name: 'StoreCity', title: 'Store City' },
        { name: 'StoreState', title: 'Store State' },
        { name: 'Employee', title: 'Employee' },
        { name: 'SaleAmount', title: 'Sale Amount' },
      ],
      rows: [],
      sortings: [{ column: 'StoreCity', direction: 'asc' }],
      loading: true,
    };

    this.sortingsChange = this.sortingsChange.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }
  sortingsChange(sortings) {
    this.setState({
      loading: true,
      sortings,
    });
  }
  queryString() {
    let queryString = `${URL}?`;

    const sorting = this.state.sortings[0];
    if (sorting) {
      const sortDirectionString = sorting.direction === 'desc' ? ' desc' : '';
      queryString = `${queryString}orderby=${sorting.column}${sortDirectionString}`;
    }
    return queryString;
  }
  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => this.setState({
        rows: data.items,
        loading: false,
      }));
    this.lastQuery = queryString;
  }
  render() {
    const { rows, columns, sortings, loading } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <DataGrid
          rows={rows}
          columns={columns}
        >
          <SortingState
            sortings={sortings}
            sortingsChange={this.sortingsChange}
          />
          <VirtualTableView />
          <TableHeaderRow sortingEnabled />
        </DataGrid>
        {loading && <Loading />}
      </div>
    );
  }
}
