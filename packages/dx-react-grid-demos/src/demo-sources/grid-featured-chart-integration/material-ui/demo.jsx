import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  RowDetailState,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  scaleBand,
} from '@devexpress/dx-chart-core';
import {
  ArgumentScale,
  Stack,
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
import { styled } from '@mui/material/styles';
import { citiesCount, regionsCount } from '../../../demo-data/chart-data';

const PREFIX = 'Demo';
const classes = {
  detailContainer: `${PREFIX}-detailContainer`,
  title: `${PREFIX}-title`,
  paper: `${PREFIX}-paper`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.detailContainer}`]: {
    marginBottom: theme.spacing(3),
  },
  [`& .${classes.title}`]: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
  },
  [`& .${classes.paper}`]: {
    paddingTop: theme.spacing(3.5),
  },
}));

const currencyFormatter = ({ value }) => (
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
);
const AxisLabel = ({ text, ...restProps }) => (
  <ValueAxis.Label {...restProps} text={currencyFormatter({ value: text })} />
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    {...props}
    formatterComponent={currencyFormatter}
  />
);

const LegendRoot = props => (
  <Legend.Root
    {...props}
    sx={{
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    }}
  />
);

const LegendLabel = props => (
  <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
);

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

const gridDetailContainerBase = data => ({ row }) => {
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
    <StyledDiv className={classes.detailContainer}>
      <h5 className={classes.title}>
        {`Economics of ${row.region}`}
      </h5>
      <Paper className={classes.paper}>
        <Chart
          data={regionCities}
          height={300}
        >
          <ArgumentScale
            factory={scaleBand}
          />
          <ArgumentAxis
            showTicks={false}
          />
          <ValueAxis
            labelComponent={AxisLabel}
          />
          {barSeriesForCity(regionCities)}
          <Stack />
          <Legend
            rootComponent={LegendRoot}
            labelComponent={LegendLabel}
            position="bottom"
          />
        </Chart>
      </Paper>
    </StyledDiv>
  );
};
const gridDetailContainer = data => gridDetailContainerBase(data);

export default () => {
  const [columns] = useState([
    { name: 'region', title: 'Region' },
    { name: 'count2013', title: '2013' },
    { name: 'count2014', title: '2014' },
    { name: 'count2015', title: '2015' },
  ]);
  const [rows] = useState(regionsCount);
  const [data] = useState(citiesCount);
  const [columnBands] = useState([
    {
      title: 'Year',
      children: [
        { columnName: 'count2013' },
        { columnName: 'count2014' },
        { columnName: 'count2015' },
      ],
    },
  ]);
  const [currencyColumns] = useState(['count2013', 'count2014', 'count2015']);

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
};
