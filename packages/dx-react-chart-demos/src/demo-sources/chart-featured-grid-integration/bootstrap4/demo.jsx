import * as React from 'react';
import { Card } from 'reactstrap';
import {
  RowDetailState,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Stack,
} from '@devexpress/dx-react-chart';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Grid as ChartGrid,
} from '@devexpress/dx-react-chart-bootstrap4';
import {
  Grid, Table, TableBandHeader, TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4';
import { citiesCount, regionsCount } from '../../../demo-data/data-for-grid';

const nullComponent = () => null;
const CurrencyFormatter = ({ value }) => `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
const AxisLabelComponent = ({
  text,
  ...restProps
}) => <ValueAxis.Label text={CurrencyFormatter({ value: text })} {...restProps} />;

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    {...props}
    formatterComponent={CurrencyFormatter}
  />
);

const LegendRoot = props => (
  <Legend.Root
    {...props}
    className="m-auto flex-row"
  />
);

const BarSeriesForCity = DataCitiesRegions => Object
  .keys(DataCitiesRegions[0])
  .reduce((acc, item, index) => {
    if (item !== 'year') {
      acc.push(
        <BarSeries
          key={index.toString()}
          valueField={item}
          argumentField="year"
          name={item}
          barWidth={0.9}
          groupWidth={0.5}
        />,
      );
    }
    return acc;
  }, []);

const gridDetailContainer = data => ({ row }) => {
  const DataCities = data.slice();
  const DataCitiesRegions = DataCities.reduce((acc, item) => {
    const citiesforregion = item.cities.reduce((current, itemCity) => {
      let currentObj = {};
      if (itemCity.region === row.region) {
        currentObj = { [itemCity.cityName]: itemCity.count };
      }
      return { ...current, ...currentObj };
    }, []);
    return [...acc, { year: item.year, ...citiesforregion }];
  }, []);

  return (
    <div className="m-3">
      <h5>
        {`Economics of ${row.region}`}
      </h5>
      <Card>
        <Chart
          data={DataCitiesRegions}
          height={300}
        >
          <ArgumentAxis
            name="year"
            type="band"
            tickComponent={nullComponent}
          />
          <ValueAxis
            labelComponent={AxisLabelComponent}
            tickComponent={nullComponent}
            lineComponent={nullComponent}
          />
          <ChartGrid />
          {BarSeriesForCity(DataCitiesRegions)}
          <Stack />
          <Legend
            rootComponent={LegendRoot}
            position="bottom"
          />
        </Chart>
      </Card>
    </div>
  );
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'count2013', title: '2013' },
        { name: 'count2014', title: '2014' },
        { name: 'count2015', title: '2015' },
      ],
      rows: regionsCount,
      columnBands: [
        {
          title: 'Year',
          children: [
            { columnName: 'count2013' },
            { columnName: 'count2014' },
            { columnName: 'count2015' },
          ],
        },
      ],
      currencyColumns: ['count2013', 'count2014', 'count2015'],
    };
  }

  render() {
    const {
      columns, columnBands, currencyColumns, rows,
    } = this.state;
    return (

      <Card>
        <Grid
          rows={rows}
          columns={columns}
        >
          <CurrencyTypeProvider
            for={currencyColumns}
          />
          <RowDetailState
            defaultExpandedRowIds={[3]}
          />
          <Table />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={gridDetailContainer(citiesCount)}
          />
          <TableBandHeader
            columnBands={columnBands}
          />
        </Grid>
      </Card>
    );
  }
}
