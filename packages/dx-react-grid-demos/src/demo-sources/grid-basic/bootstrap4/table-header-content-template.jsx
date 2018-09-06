import * as React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import { Card } from 'reactstrap';
import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

const TableHeaderContent = ({ column, children, ...restProps }) => (
  <TableHeaderRow.Content
    column={column}
    {...restProps}
  >
    {children}
    {column.name === 'region' ? (
      <button
        type="button"
        className="btn btn-outline-secondary"
        style={{ margin: '-7px 5px' }}
        // eslint-disable-next-line no-alert
        onClick={() => alert('Custom action')}
      >
        <span className="oi oi-eye" />
      </button>
    ) : null}
  </TableHeaderRow.Content>
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
    };
  }

  render() {
    const { rows, columns } = this.state;

    return (
      <Card>
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table />
          <TableHeaderRow
            contentComponent={TableHeaderContent}
          />
        </Grid>
      </Card>
    );
  }
}
