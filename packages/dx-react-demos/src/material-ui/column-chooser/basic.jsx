import React from 'react';
import MUIGrid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {
  TableColumnVisibility,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  ColumnChooser,
} from '@devexpress/dx-react-grid-material-ui';
import {
  generateRows,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex', width: 100 },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 6 }),
      columnOrder: ['city', 'sex', 'car', 'name'],
      hiddenColumnNames: ['sex', 'car'],
    };

    this.hiddenColumnNamesChange = (hiddenColumnNames) => {
      this.setState({ hiddenColumnNames });
    };
  }

  render() {
    const { columns, rows, hiddenColumnNames } = this.state;
    return (
      <MUIGrid container>
        <MUIGrid item xs={12} sm={9}>
          <Grid
            rows={rows}
            columns={columns}
          >
            <TableView />
            <TableColumnVisibility
              hiddenColumnNames={hiddenColumnNames}
            />
            <TableHeaderRow />
          </Grid>
        </MUIGrid>
        <MUIGrid item xs={12} sm={3}>
          <Paper>
            <Toolbar>
              <Typography type="subheading" color="inherit">
                ColumnChooser
              </Typography>
            </Toolbar>
            <ColumnChooser
              columns={columns}
              hiddenColumnNames={hiddenColumnNames}
              onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
            />
          </Paper>
        </MUIGrid>
      </MUIGrid>
    );
  }
}
