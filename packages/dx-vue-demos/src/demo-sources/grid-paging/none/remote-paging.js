import {
  PagingState,
  CustomPaging,
} from '@devexpress/dx-vue-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { Loading } from '../../../theme-sources/none/components/loading';

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export default {
  data() {
    return {
      rows: [],
      currentPage: 0,
      totalCount: 0,
      pageSize: 6,
      loading: true,
    };
  },
  mounted() {
    this.loadData();
  },
  updated() {
    this.loadData();
  },
  methods: {
    changeCurrentPage(currentPage) {
      this.currentPage = currentPage;
      this.loading = true;
    },
    queryString() {
      const { pageSize, currentPage } = this;

      return `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
    },
    loadData() {
      const queryString = this.queryString();
      if (queryString === this.lastQuery) {
        this.loading = false;
        return;
      }

      fetch(queryString)
        .then(response => response.json())
        .then((data) => {
          this.rows = data.items;
          this.totalCount = data.totalCount;
          this.loading = false;
        })
        .catch(() => {
          this.loading = true;
        });
      this.lastQuery = queryString;
    },
  },
  render() {
    const {
      currentPage,
      pageSize,
      totalCount,
      loading,
    } = this;
    return (
      <div class="card">
        <Grid
          rows={this.rows}
          columns={[
            { name: 'name', title: 'Name' },
            { name: 'sex', title: 'Sex' },
            { name: 'city', title: 'City' },
            { name: 'car', title: 'Car' },
          ]}
        >
          <PagingState
            currentPage$sync={currentPage}
            pageSize$sync={pageSize}
            // onCurrentPageChange={this.changeCurrentPage}
          />
          <CustomPaging
            totalCount={totalCount}
          />
          <Table />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
        {loading && <Loading />}
      </div>
    );
  },
};
