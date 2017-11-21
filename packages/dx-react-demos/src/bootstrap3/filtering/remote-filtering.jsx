import React from 'react';
import {
  FilteringState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap3';

import { Loading } from '../components/loading';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/Orders';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'ShipCountry', title: 'Country' },
        { name: 'ShipCity', title: 'City' },
        { name: 'ShipAddress', title: 'Address' },
      ],
      rows: [],
      filters: [],
      loading: true,
    };

    this.changeFilters = this.changeFilters.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }
  changeFilters(filters) {
    this.setState({
      loading: true,
      filters,
    });
  }
  queryString() {
    const { filters } = this.state;

    let filter = filters.reduce((acc, { columnName, value }) => {
      acc.push(`["${columnName}", "contains", "${value}"]`);
      return acc;
    }, []).join(',"and",');

    if (filters.length > 1) {
      filter = `[${filter}]`;
    }

    return `${URL}?filter=${filter}`;
  }
  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString, { mode: 'cors' })
      .then(response => response.json())
      .then((orders) => {
        this.setState({
          rows: orders.data,
          loading: false,
        });
      })
      .catch(() => this.setState({ loading: false }));

    this.lastQuery = queryString;
  }
  render() {
    const { rows, columns, loading } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <FilteringState
            onFiltersChange={this.changeFilters}
          />
          <VirtualTable />
          <TableHeaderRow />
          <TableFilterRow rowHeight={51} />
        </Grid>
        {loading && <Loading />}
      </div>
    );
  }
}
