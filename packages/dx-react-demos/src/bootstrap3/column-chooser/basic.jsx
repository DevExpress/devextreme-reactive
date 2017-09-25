import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  HiddenTableColumns,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  ColumnChooser,
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
      <Row>
        <Col xs={12} sm={9}>
          <Grid
            rows={rows}
            columns={columns}
          >
            <TableView />
            <HiddenTableColumns
              hiddenColumnNames={hiddenColumnNames}
            />
            <TableHeaderRow />
          </Grid>
        </Col>
        <Col xs={12} sm={3}>
          <div className="panel panel-default">
            <div className="panel-heading">Column Chooser</div>
            <ColumnChooser
              columns={columns}
              hiddenColumnNames={hiddenColumnNames}
              onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
            />
          </div>
        </Col>
      </Row>
    );
  }
}
