import React from 'react';
import MUIGrid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {
  Grid,
  Table,
  TableHeaderRow,
  ColumnChooser,
  TableColumnVisibility,
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
      hiddenColumns: ['sex', 'car'],
    };

    this.hiddenColumnsChange = (hiddenColumns) => {
      this.setState({ hiddenColumns });
    };
  }

  render() {
    const { columns, rows, hiddenColumns } = this.state;
    return (
      <MUIGrid container>
        <MUIGrid item xs={12} sm={9}>
          <Paper>
            <Grid
              rows={rows}
              columns={columns}
            >
              <Table />
              <TableHeaderRow />
              <TableColumnVisibility
                hiddenColumns={hiddenColumns}
              />
            </Grid>
          </Paper>
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
              hiddenColumns={hiddenColumns}
              onHiddenColumnsChange={this.hiddenColumnsChange}
            />
          </Paper>
        </MUIGrid>
      </MUIGrid>
    );
  }
}
