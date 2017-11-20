import React from 'react';
import {
  SelectionState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import {
  generateRows,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 6 }),
      selection: [1],
    };

    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const { rows, columns, selection } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
          <Table />
          <TableSelection />
        </Grid>
      </Paper>
    );
  }
}
