import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, SelectionState, PagingState, GroupingState,
  LocalGrouping, LocalPaging, LocalSorting,
  ColumnOrderState, RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropContext, TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import {
  AppBar, Paper, Typography, IconButton,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Tabs, Tab, Divider,
} from 'material-ui';
import DoneIcon from 'material-ui-icons/Done';
import PauseIcon from 'material-ui-icons/PauseCircleOutline';
import LoopIcon from 'material-ui-icons/Loop';
import HelpIcon from 'material-ui-icons/HelpOutline';
import { MuiThemeProvider, withStyles, createStyleSheet, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { blue } from 'material-ui/styles/colors';

import {
  generateRows,
  employeeValues,
  employeeTaskValues,
} from '../../demoData';

const createTheme = theme => createMuiTheme({
  palette: createPalette({
    type: theme,
    primary: blue,
  }),
});

const styleSheet = createStyleSheet('ThemingDemo', theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: 0,
  },
}));

const TaskIcon = ({ status }) => {
  switch (status) {
    case 'Deferred': return <PauseIcon />;
    case 'In Progress': return <LoopIcon />;
    case 'Need Assistance': return <HelpIcon />;
    default: return <DoneIcon />;
  }
};

TaskIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

const TabContainer = ({ rows }) => {
  const lastItemIndex = rows.length - 1;

  return (
    <List style={{ height: 180 }}>
      {
      rows.map((item, index) => {
        const key = index;
        const status = item.status;
        return (<div key={key}>
          <ListItem dense>
            <ListItemText primary={item.subject} />
            <ListItemSecondaryAction>
              <IconButton aria-label={status}>
                <TaskIcon status={status} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < lastItemIndex && <Divider />}
        </div>);
      })
    }
    </List>
  );
};

TabContainer.propTypes = {
  rows: PropTypes.array.isRequired,
};

class GridDetailContainerBase extends React.PureComponent {
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
    return this.props.data.tasks.filter(task => task.priority === priority);
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
    const { lowPriorityTasks, normalPriorityTasks, highPriorityTasks, index } = this.state;
    const { data, classes } = this.props;

    return (<div className={classes.root}>
      <Typography type="title" component="h5" className={classes.title}>
        {data.firstName} {data.lastName}&apos;s Tasks by Priority:
      </Typography>
      <Paper>
        <AppBar position="static" color="inherit">
          <Tabs
            index={index}
            onChange={this.handleChange}
            fullWidth
          >
            <Tab label={`Low (${lowPriorityTasks.length})`} disabled={!lowPriorityTasks.length} />
            <Tab label={`Normal (${normalPriorityTasks.length})`} disabled={!normalPriorityTasks.length} />
            <Tab label={`High (${highPriorityTasks.length})`} disabled={!highPriorityTasks.length} />
          </Tabs>
        </AppBar>
        {index === 0 && <TabContainer rows={lowPriorityTasks} />}
        {index === 1 && <TabContainer rows={normalPriorityTasks} />}
        {index === 2 && <TabContainer rows={highPriorityTasks} />}
      </Paper>
    </div>);
  }
}

GridDetailContainerBase.propTypes = {
  data: PropTypes.shape().isRequired,
  classes: PropTypes.object.isRequired,
};

const GridDetailContainer = withStyles(styleSheet)(GridDetailContainerBase);

// eslint-disable-next-line
const createGrid = () => ({ rows, columns, allowedPageSizes }) => (<Grid
  rows={rows}
  columns={columns}
>
  <ColumnOrderState defaultOrder={columns.map(column => column.name)} />

  <SortingState
    defaultSorting={[
      { columnName: 'product', direction: 'asc' },
    ]}
  />
  <GroupingState />
  <PagingState
    defaultCurrentPage={0}
    defaultPageSize={10}
  />
  <RowDetailState
    defaultExpandedRows={[2]}
  />

  <LocalSorting />
  <LocalGrouping />
  <LocalPaging />

  <SelectionState
    defaultSelection={[1, 3, 18]}
  />

  <DragDropContext />

  <TableView allowColumnReordering />

  <TableHeaderRow allowSorting allowGrouping allowDragging />
  <PagingPanel
    allowedPageSizes={allowedPageSizes}
  />
  <TableSelection />
  <TableRowDetail
    template={({ row }) => (
      <GridDetailContainer
        data={row}
      />
    )}
  />
  <TableGroupRow />
  <GroupingPanel allowSorting />
</Grid>);

// eslint-disable-next-line
export class ThemingGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'prefix', title: 'Title', width: 100 },
        { name: 'firstName', title: 'First Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'position', title: 'Position', width: 170 },
        { name: 'state', title: 'State', width: 125 },
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
      allowedPageSizes: [5, 10, 15],
      currentTheme: createTheme(this.props.theme),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.theme) {
      this.setState({ currentTheme: createTheme(nextProps.theme) });
    }
  }
  render() {
    const { rows, columns, allowedPageSizes, currentTheme } = this.state;
    const GridInst = createGrid();

    return (
      <MuiThemeProvider theme={currentTheme}>
        <GridInst
          rows={rows}
          columns={columns}
          allowedPageSizes={allowedPageSizes}
        />
      </MuiThemeProvider>
    );
  }
}

ThemingGrid.propTypes = {
  theme: PropTypes.string.isRequired,
};
