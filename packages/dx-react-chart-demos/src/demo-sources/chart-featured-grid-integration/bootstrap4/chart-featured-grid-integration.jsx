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
import { sales as dataBase, citiescount as cities, dataforregions as dataforgrid } from '../../../demo-data/data-for-grid';

const nullComponent = () => null;

const AxisLabelComponent = ({
  text,
  ...restProps
}) => <ValueAxis.Label text={`$ ${text}`} {...restProps} />;

const CurrencyFormatter = ({ value }) => (
  <div>
$
    {' '}
    {value}
  </div>
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);


const LegendRoot = props => (
  <Legend.Root
    {...props}
    style={{ display: 'flex', margin: 'auto' }}
  />
);
const LegendLabel = ({
  text,
  ...restProps
}) => (
  <Legend.Label
    text={`${text}`}
    {...restProps}
    style={{ wordWrap: 'normal' }}
  />
);
const BarSeriesForCity = (DataCitiesRegions) => {
  const bars = [];
  Object.keys(DataCitiesRegions[0]).forEach((item, index) => {
    if (item !== 'year') {
      bars.push(
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
  });
  return bars;
};
let DataCities = [];
const GridDetailContainer = ({ row }) => {
  const DataCitiesRegions = [];
  DataCities.forEach((item) => {
    const ChartItem = {};
    ChartItem.year = item.year;
    item.city.forEach((itemCity) => {
      if (itemCity.region === row.region) {
        ChartItem[itemCity.cityName] = itemCity.count;
      }
    });
    DataCitiesRegions.push(ChartItem);
  });

  return (
    <div>
      <div>
        <h5>
          {row.region}
&apos;s Economics:
        </h5>
      </div>
      <Card>
        <Chart
          data={DataCitiesRegions}
          height="300"
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
            //labelComponent={LegendLabel}
            position="bottom"
          />
        </Chart>
      </Card>
    </div>
  );
};

const returnAmount = (data, region, year) => data
  .filter(item => item.date.getFullYear() === year && item.region === region)
  .reduce((sum, current) => sum + current.amount, 0);
const getDataRegionCount = data => dataforgrid.map(item => ({
  region: item.region,
  count2013: returnAmount(data, item.region, 2013),
  count2014: returnAmount(data, item.region, 2014),
  count2015: returnAmount(data, item.region, 2015),
}));
const AllCityData = [
  {
    year: 2013,
  },
  {
    year: 2014,
  },
  {
    year: 2015,
  },
];

const returnCityCount = (data, cityName, year) => data
  .filter(item => item.date.getFullYear() === year && item.city === cityName)
  .reduce((sum, current) => sum + current.amount, 0);
const returnRegion = cityName => cities
  .filter(item => item.cityName === cityName)
  .map(item => item.region);
const returnCity = (data, cityName, year) => ({
  cityName,
  region: returnRegion(cityName)[0],
  count: returnCityCount(data, cityName, year),
});
const returnCities = (data, year) => cities
  .map(item => (
    returnCity(data, item.cityName, year)
  ));
const getDataCityCount = data => AllCityData.map(item => ({
  year: item.year,
  city: returnCities(data, item.year),
}));
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
      height: 200,

    };
  }

  render() {
    const {
      columns, columnBands, height, currencyColumns,
    } = this.state;
    DataCities = getDataCityCount(dataBase);
    const formatedData = getDataRegionCount(dataBase);
    return (

      <Card>
        <Grid
          rows={formatedData}
          columns={columns}
        >
          <CurrencyTypeProvider
            for={currencyColumns}
          />
          <RowDetailState />
          <Table />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={GridDetailContainer}
            rowHeight={height}
          />
          <TableBandHeader
            columnBands={columnBands}
          />
        </Grid>
      </Card>
    );
  }
}
