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
import { citiescount as cities, dataforregions as dataforgrid } from '../../../demo-data/data-for-grid';

const nullComponent = () => null;
const AxisLabelComponent = ({
  text,
  ...restProps
}) => <ValueAxis.Label text={`$ ${text}`} {...restProps} />;

const CurrencyFormatter = ({ value }) => `$${value}`;


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

let DataCities = [];
const gridDetailContainerBase = ({ row, classes }) => {
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

const gridDetailContainer = withStyles(detailContainerStyles, { name: 'ChartContainer' })(gridDetailContainerBase);

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
    DataCities = cities.slice();
    const formatedData = dataforgrid.slice();
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
            contentComponent={gridDetailContainer}
          />
          <TableBandHeader
            columnBands={columnBands}
          />
        </Grid>
      </Paper>
    );
  }
}
