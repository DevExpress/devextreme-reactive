import React from 'react';
import {
  DataGrid,
  TableHeaderRow,
  PagingState,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';

import { Loading } from '../components/loading';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export class RemotePagingDemo extends React.PureComponent {
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
      totalCount: 0,
      pageSize: 6,
      currentPage: 0,
      loading: true,
    };

    this.currentPageChange = this.currentPageChange.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }
  currentPageChange(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }
  queryString() {
    const { pageSize, currentPage } = this.state;

    return `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
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
        totalCount: data.totalCount,
        loading: false,
      }));
    this.lastQuery = queryString;
  }
  render() {
    const { rows, columns, pageSize, currentPage, totalCount, loading } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <DataGrid
          rows={rows}
          columns={columns}
        >
          <PagingState
            currentPage={currentPage}
            currentPageChange={this.currentPageChange}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          <TableView />
          <TableHeaderRow />
          <PagingPanel />
        </DataGrid>
        {loading && <Loading />}
      </div>
    );
  }
}
