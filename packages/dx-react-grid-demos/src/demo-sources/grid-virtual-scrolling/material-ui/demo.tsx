import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  defaultColumnValues,
} from '../../../demo-data/generator';

const getRowId = row => row.id;

const root = props => (
  <Grid.Root {...props} style={{ height: '100%' }} />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 100000,
      }),
    };
  }

  public render(): React.ReactNode {
    const { rows, columns } = this.state;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          rootComponent={root}
        >
          <VirtualTable
            height="auto"
          />
          <TableHeaderRow />
        </Grid>
      </Paper>
    );
  }
}
