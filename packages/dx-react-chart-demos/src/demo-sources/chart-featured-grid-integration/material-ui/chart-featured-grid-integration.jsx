import * as React from 'react';
import Paper from '@material-ui/core/Paper';
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
} from '@devexpress/dx-react-chart-material-ui';
import {
  Grid, Table, TableBandHeader, TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { sales as dataBase, citiescount as cities, dataforregions as dataforgrid } from '../../../demo-data/data-for-grid';

const nullComponent = () => null;
const START_YEAR = 2013;
const END_YEAR = 2016;
const AxisLabelComponent = ({
  text,
  ...restProps
}) => <ValueAxis.Label text={`$ ${text}`} {...restProps} />;

const CurrencyFormatter = ({ value }) => (
  <div>
    {'$ '}
    {value}
  </div>
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

const detailContainerStyles = theme => ({
  detailContainer: {
    marginBottom: '30px',
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
  },
});

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

const LegendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root
    {...restProps}
    className={classes.root}
  />
);

const LegendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(LegendRootBase);

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
const GridDetailContainerBase = ({ row, classes }) => {
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
    <div className={classes.detailContainer}>
      <div>
        <h5 className={classes.title}>
          {'Economics of '}
          {row.region}
        </h5>
      </div>
      <Paper>
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
      </Paper>
    </div>
  );
};

const GridDetailContainer = withStyles(detailContainerStyles, { name: 'ChartContainer' })(GridDetailContainerBase);

const returnAmount = (data, region, year) => data
  .filter(item => item.date.getFullYear() === year && item.region === region)
  .reduce((sum, current) => sum + current.amount, 0);
const getDataRegionCount = data => dataforgrid.map(item => ({
  region: item.region,
  count2013: returnAmount(data, item.region, 2013),
  count2014: returnAmount(data, item.region, 2014),
  count2015: returnAmount(data, item.region, 2015),
}));

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

const getDataCityCount = (data) => {
  let year = START_YEAR;
  const nextData = [];
  while (year < END_YEAR) {
    nextData.push({
      year,
      city: returnCities(data, year),
    });
    year += 1;
  }
  return nextData;
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
      columns, columnBands, currencyColumns,
    } = this.state;
    DataCities = getDataCityCount(dataBase);
    const formatedData = getDataRegionCount(dataBase);
    return (

      <Paper>
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
          />
          <TableBandHeader
            columnBands={columnBands}
          />
        </Grid>
      </Paper>
    );
  }
}
