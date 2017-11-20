import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  Grid,
  Table,
  TableHeaderRow,
  ColumnChooser,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-bootstrap3';
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
      <Row>
        <Col xs={12} sm={9}>
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
        </Col>
        <Col xs={12} sm={3}>
          <div className="panel panel-default">
            <div className="panel-heading">Column Chooser</div>
            <ColumnChooser
              columns={columns}
              hiddenColumns={hiddenColumns}
              onHiddenColumnsChange={this.hiddenColumnsChange}
            />
          </div>
        </Col>
      </Row>
    );
  }
}
