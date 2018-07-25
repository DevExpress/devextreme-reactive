import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack } from '@devexpress/dx-react-chart';
import { olympicsData as baseData } from '../../../demo-data/data-olympics';

const nullComponent = () => null;
const getOlympicData = (chartData, currentType, currentCredit) => ({
  year: chartData.year,
  summUSA: chartData[currentType].usa[currentCredit],
  summUSSR: chartData[currentType].ussr[currentCredit],
});
const getData = (data, currentType, currentCredit) => data
  .slice()
  .reduce((acc, item) => {
    if (item[currentType]) {
      const year = getOlympicData(item, currentType, currentCredit);
      acc.push(year);
    } return acc;
  }, []);
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
const legendRootComponent = ({ ...restProps }) => <Legend.Root style={{ display: 'flex', margin: 'auto' }} {...restProps} />;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      season: 'winter',
      credit: 'summ',
      data: getData(baseData, 'winter', 'summ'),
    };
  }

  chooseSeason(season) {
    const { credit } = this.state;
    this.setState({
      data: getData(baseData, season, credit),
      season,
    });
  }

  chooseCredit(credit) {
    const { season } = this.state;
    this.setState({
      data: getData(baseData, season, credit),
      credit,
    });
  }

  primaryButton(season) {
    return (
      <Button style={{ marginRight: '5px' }} variant="contained" color="primary" onClick={() => this.chooseSeason(season)}>
        {capitalizeFirstLetter(season)}
      </Button>
    );
  }

  secondaryButton(credit) {
    return (
      <Button style={{ marginRight: '5px' }} variant="contained" onClick={() => this.chooseCredit(credit)}>
        {capitalizeFirstLetter(credit)}
      </Button>
    );
  }

  render() {
    const { data, credit, season } = this.state;
    return (
      <Card>
        <Chart data={data}>
          <ArgumentAxis
            type="band"
            name="year"
            tickComponent={nullComponent}
          />
          <ValueAxis
            tickComponent={nullComponent}
            lineComponent={nullComponent}
          />
          <Grid />
          <BarSeries
            valueField="summUSA"
            argumentField="year"
            name="USA"
          />
          <BarSeries
            valueField="summUSSR"
            argumentField="year"
            name="USSR"
          />
          <Stack />
          <Legend
            position="bottom"
            rootComponent={legendRootComponent}
          />
        </Chart>

        <CardContent>
          <Typography gutterBottom variant="headline">
            {`${capitalizeFirstLetter(season)} Olympic Games (${capitalizeFirstLetter(credit)})`}
          </Typography>
          <Typography variant="subheading" style={{ marginBottom: '10px' }}>
            Choose the season of the Olympic Games and the type of medal
          </Typography>
          <div style={{ align: 'left', display: 'inline-block' }}>
            {this.primaryButton('summer')}
            {this.primaryButton('winter')}
          </div>
          <div style={{ float: 'right', display: 'inline-block' }}>
            {this.secondaryButton('summ')}
            {this.secondaryButton('gold')}
            {this.secondaryButton('silver')}
            {this.secondaryButton('bronze')}
          </div>
        </CardContent>
      </Card>
    );
  }
}
