import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, SelectionState, PagingState, GroupingState,
  IntegratedGrouping, IntegratedPaging, IntegratedSorting, RowDetailState, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropProvider, TableRowDetail,
  TableColumnReordering, Toolbar,
} from '@devexpress/dx-react-grid-bootstrap3';
import { Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../../demo-data/generator';


const TaskIcon = ({ status }) => {
  switch (status) {
    case 'Deferred': return <i className="glyphicon glyphicon-time" />;
    case 'In Progress': return <i className="glyphicon glyphicon-cog" />;
    case 'Need Assistance': return <i className="glyphicon glyphicon-earphone" />;
    default: return <i className="glyphicon glyphicon-ok" />;
  }
};

TaskIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

const TabContainer = ({ rows }) => (
  <ListGroup>
    {rows.map((item, index) => {
      const key = index;
      const { status } = item;
      return (
        <ListGroupItem key={key}>
          <span style={{ float: 'right' }}>
            <TaskIcon status={status} />
          </span>
          {item.subject}
        </ListGroupItem>
      );
    })}
  </ListGroup>
);

TabContainer.propTypes = {
  rows: PropTypes.array.isRequired,
};

class GridDetailContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      lowPriorityTasks: this.findTasks('Low'),
      normalPriorityTasks: this.findTasks('Normal'),
      highPriorityTasks: this.findTasks('High'),
    };
    this.state.index = this.firstSelectedIndex();
    this.handleChange = this.handleChange.bind(this);
  }
  findTasks(priority) {
    return this.props.row.tasks.filter(task => task.priority === priority);
  }
  firstSelectedIndex() {
    let result = 0;
    const { lowPriorityTasks, normalPriorityTasks } = this.state;

    if (!lowPriorityTasks.length) {
      result = normalPriorityTasks.length ? 1 : 2;
    }

    return result;
  }
  handleChange(event, index) {
    this.setState({ index });
  }
  render() {
    const {
      lowPriorityTasks, normalPriorityTasks, highPriorityTasks, index,
    } = this.state;
    const { row } = this.props;

    return (
      <div
        style={{ margin: '20px' }}
      >
        <h4
          style={{ marginBottom: '20px' }}
        >
          {row.firstName} {row.lastName}&apos;s Tasks by Priority:
        </h4>

        <Nav
          bsStyle="pills"
          activeKey={index}
          onSelect={newIndex => this.setState({ index: newIndex })}
          style={{ marginBottom: '20px' }}
        >
          <NavItem eventKey={0} title="Low" disabled={!lowPriorityTasks.length}>
            {`Low (${lowPriorityTasks.length})`}
          </NavItem>
          <NavItem eventKey={1} title="Normal" disabled={!normalPriorityTasks.length}>
            {`Normal (${normalPriorityTasks.length})`}
          </NavItem>
          <NavItem eventKey={2} title="High" disabled={!highPriorityTasks.length}>
            {`High (${highPriorityTasks.length})`}
          </NavItem>
        </Nav>
        {index === 0 && <TabContainer rows={lowPriorityTasks} />}
        {index === 1 && <TabContainer rows={normalPriorityTasks} />}
        {index === 2 && <TabContainer rows={highPriorityTasks} />}
      </div>
    );
  }
}

GridDetailContainer.propTypes = {
  row: PropTypes.object.isRequired,
};

// eslint-disable-next-line
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'prefix', title: 'Title' },
        { name: 'firstName', title: 'First Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'position', title: 'Position' },
        { name: 'state', title: 'State' },
      ],
      tableColumnExtensions: [
        { columnName: 'prefix', width: 100 },
        { columnName: 'position', width: 170 },
        { columnName: 'state', width: 125 },
      ],
      rows: generateRows({
        columnValues: {
          ...employeeValues,
          tasks: ({ random }) => generateRows({
            columnValues: employeeTaskValues,
            length: Math.floor(random() * 4) + 5,
            random,
          }),
        },
        length: 40,
      }),
      pageSizes: [5, 10, 15],
    };
  }
  render() {
    const {
      rows, columns, tableColumnExtensions, pageSizes,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState />
        <GroupingState />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={10}
        />
        <RowDetailState
          defaultExpandedRows={[2]}
        />
        <SelectionState
          defaultSelection={[1, 3, 18]}
        />

        <IntegratedSorting />
        <IntegratedGrouping />
        <IntegratedPaging />
        <IntegratedSelection />

        <DragDropProvider />

        <Table
          columnExtensions={tableColumnExtensions}
        />

        <TableColumnReordering defaultOrder={columns.map(column => column.name)} />

        <TableHeaderRow showSortingControls />
        <PagingPanel
          pageSizes={pageSizes}
        />
        <TableSelection showSelectAll />
        <TableRowDetail
          contentComponent={GridDetailContainer}
        />
        <TableGroupRow />
        <Toolbar />
        <GroupingPanel showSortingControls />
      </Grid>
    );
  }
}
