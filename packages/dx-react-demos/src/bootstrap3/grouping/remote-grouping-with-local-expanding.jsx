import React from 'react';
import {
  GroupingState,
  CustomGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTableView,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  DragDropContext,
} from '@devexpress/dx-react-grid-bootstrap3';
import { Loading } from '../components/loading';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi';

const getRowId = row => row.OrderID;
const getChildGroups = groups => groups
  .map(group => ({ key: group.key, childRows: group.items }));

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'ShipCountry', title: 'Country' },
        { name: 'ShipCity', title: 'City' },
        { name: 'ShipAddress', title: 'Address' },
      ],
      data: [],
      grouping: [],
      tempGrouping: null,
      expandedGroups: [],
      tempExpandedGroups: null,
      loading: true,
    };

    this.changeGrouping = this.changeGrouping.bind(this);
    this.changeExpandedGroups = this.changeExpandedGroups.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }
  changeGrouping(grouping) {
    this.setState({
      loading: true,
      grouping,
      tempGrouping: this.state.grouping,
      tempExpandedGroups: this.state.expandedGroups,
    });
  }
  changeExpandedGroups(expandedGroups) {
    this.setState({
      expandedGroups,
    });
  }
  queryString() {
    const { grouping } = this.state;
    if (!grouping.length) return URL;

    const groupConfig = grouping
      .map(columnGrouping => ({
        selector: columnGrouping.columnName,
        isExpanded: true,
      }));
    return `${URL}?group=${JSON.stringify(groupConfig)}`;
  }
  loadData() {
    if (!this.state.loading) return;

    const queryString = this.queryString();
    fetch(queryString, { mode: 'cors' })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          data,
          tempGrouping: null,
          tempExpandedGroups: null,
          loading: false,
        });
      })
      .catch(() => this.setState({ loading: false }));

    this.lastQuery = queryString;
  }
  render() {
    const {
      data,
      columns,
      grouping,
      tempGrouping,
      expandedGroups,
      tempExpandedGroups,
      loading,
    } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <Grid
          rows={data}
          columns={columns}
          getRowId={getRowId}
        >
          <DragDropContext />
          <GroupingState
            grouping={grouping}
            onGroupingChange={this.changeGrouping}
            expandedGroups={expandedGroups}
            onExpandedGroupsChange={this.changeExpandedGroups}
          />
          <CustomGrouping
            getChildGroups={getChildGroups}
            grouping={tempGrouping}
            expandedGroups={tempExpandedGroups}
          />
          <VirtualTableView />
          <TableHeaderRow allowDragging />
          <TableGroupRow />
          <GroupingPanel allowDragging />
        </Grid>
        {loading && <Loading />}
      </div>
    );
  }
}
