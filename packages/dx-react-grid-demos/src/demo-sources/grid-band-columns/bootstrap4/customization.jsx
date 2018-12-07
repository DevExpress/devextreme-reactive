import * as React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableBandHeader,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import { countries } from '../countries';

const PercentFormatter = ({ value }) => (
  <span>
    {value}
    %
  </span>
);

const PercentTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={PercentFormatter}
    {...props}
  />
);

const BandCell = ({
  children, tableRow, tableColumn, column, ...restProps
}) => {
  let icon = 0;
  if (column.title === 'Population') icon = 'person';
  if (column.title === 'Nominal GDP') icon = 'bar-chart';
  if (column.title === 'By Sector') icon = 'globe';
  return (
    <TableBandHeader.Cell
      {...restProps}
      column={column}
      className="text-secondary"
    >
      {children}
      <span
        className={`ml-2 oi oi-${icon}`}
      />
    </TableBandHeader.Cell>
  );
};

const HeaderCell = ({ className, ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    className={`text-info ${className}`}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'Country', title: 'Country' },
        { name: 'Area', title: 'Area, sq. km.' },
        { name: 'Population_Total', title: 'Total' },
        { name: 'Population_Urban', title: 'Urban' },
        { name: 'GDP_Total', title: 'Total, min $' },
        { name: 'GDP_Industry', title: 'Industry' },
        { name: 'GDP_Services', title: 'Services' },
        { name: 'GDP_Agriculture', title: 'Agriculture' },
      ],
      columnBands: [
        {
          title: 'Population',
          children: [
            { columnName: 'Population_Total' },
            { columnName: 'Population_Urban' },
          ],
        },
        {
          title: 'Nominal GDP',
          children: [
            { columnName: 'GDP_Total' },
            {
              title: 'By Sector',
              children: [
                { columnName: 'GDP_Agriculture' },
                { columnName: 'GDP_Industry' },
                { columnName: 'GDP_Services' },
              ],
            },
          ],
        },
      ],
      tableColumnExtensions: [
        { columnName: 'Area', width: 125, align: 'right' },
        { columnName: 'Population_Total', width: 110, align: 'right' },
        { columnName: 'Population_Urban', width: 75, align: 'right' },
        { columnName: 'GDP_Total', width: 115, align: 'right' },
        { columnName: 'GDP_Industry', width: 90, align: 'right' },
        { columnName: 'GDP_Services', width: 90, align: 'right' },
        { columnName: 'GDP_Agriculture', width: 110, align: 'right' },
      ],
      percentColumns: ['GDP_Industry', 'GDP_Services', 'GDP_Agriculture', 'Population_Urban'],
    };
  }

  render() {
    const {
      columns, tableColumnExtensions, columnBands, percentColumns,
    } = this.state;

    return (
      <div className="card">
        <Grid
          rows={countries}
          columns={columns}
        >
          <PercentTypeProvider
            for={percentColumns}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow
            cellComponent={HeaderCell}
          />
          <TableBandHeader
            columnBands={columnBands}
            cellComponent={BandCell}
          />
        </Grid>
      </div>
    );
  }
}
