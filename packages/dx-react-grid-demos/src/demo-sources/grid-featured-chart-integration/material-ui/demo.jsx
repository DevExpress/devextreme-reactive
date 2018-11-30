import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  RowDetailState,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Stack,
  Scale,
} from '@devexpress/dx-react-chart';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Grid, Table, TableBandHeader, TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { citiesCount, regionsCount } from '../../../demo-data/chart-data';

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
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});

const nullComponent = () => null;
const currencyFormatter = ({ value }) => `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
const axisLabel = ({
  text,
  ...restProps
}) => <ValueAxis.Label text={currencyFormatter({ value: text })} {...restProps} />;

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    {...props}
    formatterComponent={currencyFormatter}
  />
);

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root
    {...restProps}
    className={classes.root}
  />
);
const legendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendLabel = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

const barSeriesForCity = regionCities => Object
  .keys(regionCities[0])
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
  const regionCities = data.reduce((acc, item) => {
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
          data={regionCities}
          height={300}
        >
          <ArgumentAxis
            type="band"
            tickComponent={nullComponent}
          />
          <ValueAxis
            labelComponent={axisLabel}
            tickComponent={nullComponent}
            lineComponent={nullComponent}
          />
          {barSeriesForCity(regionCities)}
          <Stack />
          <Scale />
          <Legend
            rootComponent={legendRoot}
            labelComponent={legendLabel}
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
      data: citiesCount,
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
      columns, columnBands, currencyColumns, rows, data,
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
            defaultExpandedRowIds={[1]}
          />
          <Table />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={gridDetailContainer(data)}
          />
          <TableBandHeader
            columnBands={columnBands}
          />
        </Grid>
      </Paper>
    );
  }
}
