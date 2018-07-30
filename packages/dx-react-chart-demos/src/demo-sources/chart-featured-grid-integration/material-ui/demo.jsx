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
import { citiesCount, regionsCount } from '../../../demo-data/data-for-grid';

const detailContainerStyles = theme => ({
  detailContainer: {
    marginBottom: 3 * theme.spacing.unit,
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
  },
  paper: {
    paddingTop: 3.5 * theme.spacing.unit,
  },
});
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

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
        />,
      );
    }
    return acc;
  }, []);

const gridDetailContainerBase = data => ({ row, classes }) => {
  const DataCities = data.slice();
  const DataCitiesRegions = DataCities.reduce((acc, item) => {
    const currentCities = item.cities.reduce((current, itemCity) => {
      let currentObj = {};
      if (itemCity.region === row.region) {
        currentObj = { [itemCity.cityName]: itemCity.count };
      }
      return { ...current, ...currentObj };
    }, []);
    return [...acc, { year: item.year, ...currentCities }];
  }, []);

  return (
    <div className={classes.detailContainer}>
      <h5 className={classes.title}>
        {`Economics of ${row.region}`}
      </h5>
      <Paper className={classes.paper}>
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
const gridDetailContainer = data => withStyles(detailContainerStyles, { name: 'ChartContainer' })(gridDetailContainerBase(data));

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
      <Paper>
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
      </Paper>
    );
  }
}
