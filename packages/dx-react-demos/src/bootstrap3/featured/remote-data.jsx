import React from 'react';
import {
  Grid,
  PagingState,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  TableView,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap3';
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
      sorting: [{ columnName: 'StoreCity', direction: 'asc' }],
      totalCount: 0,
      pageSize: 12,
      currentPage: 0,
      loading: true,
    };

    this.changeSorting = this.changeSorting.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }
  changeSorting(sorting) {
    this.setState({
      loading: true,
      sorting,
    });
  }
  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }
  queryString() {
    const { sorting, pageSize, currentPage } = this.state;

    let queryString = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;

    const columnSorting = sorting[0];
    if (columnSorting) {
      const sortingDirectionString = columnSorting.direction === 'desc' ? ' desc' : '';
      queryString = `${queryString}&orderby=${columnSorting.columnName}${sortingDirectionString}`;
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
    const { rows, columns, sorting, pageSize, currentPage, totalCount, loading } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
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
          <TableHeaderRow allowSorting />
          <PagingPanel />
        </Grid>
        {loading && <Loading />}
      </div>
    );
  }
}
