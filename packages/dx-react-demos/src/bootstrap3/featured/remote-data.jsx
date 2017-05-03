import React from 'react';
import {
  DataGrid,
  PagingState,
  SortingState,
} from '@devexpress/dx-react-datagrid';
import {
  TableView,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-datagrid-bootstrap3';
import { Loading } from '../components/loading';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export class RemoteDataDemo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'OrderNumber', title: 'Order #', align: 'right' },
        { name: 'OrderDate', title: 'Order Date' },
        { name: 'StoreCity', title: 'Store City' },
        { name: 'StoreState', title: 'Store State' },
        { name: 'Employee', title: 'Employee' },
        { name: 'SaleAmount', title: 'Sale Amount', align: 'right' },
      ],
      rows: [],
      sortings: [{ column: 'StoreCity', direction: 'asc' }],
      totalCount: 0,
      pageSize: 12,
      currentPage: 0,
      loading: true,
    };

    this.sortingsChange = this.sortingsChange.bind(this);
    this.currentPageChange = this.currentPageChange.bind(this);
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
  currentPageChange(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }
  queryString() {
    const { sortings, pageSize, currentPage } = this.state;

    let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;

    const sorting = sortings[0];
    if (sorting) {
      const sortDirectionString = sorting.direction === 'desc' ? ' desc' : '';
      queryString = `${queryString}&orderby=${sorting.column}${sortDirectionString}`;
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
        totalCount: data.totalCount,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }
  render() {
    const { rows, columns, sortings, pageSize, currentPage, totalCount, loading } = this.state;

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
          <PagingState
            currentPage={currentPage}
            currentPageChange={this.currentPageChange}
            pageSize={pageSize}
            totalCount={totalCount}
          />
          <TableView
            tableCellTemplate={({ row, column }) => {
              if (column.name === 'SaleAmount') {
                return (
                  <td style={{ textAlign: 'right' }}>${row.SaleAmount}</td>
                );
              }
              return undefined;
            }}
            tableNoDataCellTemplate={({ colspan }) => (
              <td
                style={{
                  textAlign: 'center',
                  padding: '40px 0',
                }}
                colSpan={colspan}
              >
                <big className="text-muted">{loading ? '' : 'No data'}</big>
              </td>
            )}
          />
          <TableHeaderRow sortingEnabled />
          <PagingPanel />
        </DataGrid>
        {loading && <Loading />}
      </div>
    );
  }
}
