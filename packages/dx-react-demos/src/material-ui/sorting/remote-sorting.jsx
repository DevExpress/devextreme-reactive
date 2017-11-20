import React from 'react';
import {
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import { Loading } from '../components/loading';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export default class Demo extends React.PureComponent {
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
      sorting: [{ columnName: 'StoreCity', direction: 'asc' }],
      loading: true,
    };

    this.changeSorting = this.changeSorting.bind(this);
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
  queryString() {
    let queryString = `${URL}?`;

    const columnSorting = this.state.sorting[0];
    if (columnSorting) {
      const sortDirectionString = columnSorting.direction === 'desc' ? ' desc' : '';
      queryString = `${queryString}orderby=${columnSorting.columnName}${sortDirectionString}`;
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
      }))
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }
  render() {
    const {
      rows, columns, sorting, loading,
    } = this.state;

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <VirtualTableView />
          <TableHeaderRow allowSorting />
        </Grid>
        {loading && <Loading />}
      </Paper>
    );
  }
}
