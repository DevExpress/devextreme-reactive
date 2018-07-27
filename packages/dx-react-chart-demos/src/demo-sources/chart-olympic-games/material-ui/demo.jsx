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
  amountUSA: chartData[currentType].usa[currentCredit],
  amountUSSR: chartData[currentType].ussr[currentCredit],
});
const getData = (data, currentType, currentCredit) => data
  .filter(item => item[currentType])
  .map(item => getOlympicData(item, currentType, currentCredit));
const legendRootComponent = ({ ...restProps }) => <Legend.Root style={{ display: 'flex', margin: 'auto' }} {...restProps} />;

const createButton = (text, handler) => (
  <Button style={{ marginRight: '5px', textTransform: 'capitalize' }} variant="contained" color="primary" onClick={() => handler(text)}>
    {text}
  </Button>
);
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      season: 'summer',
      credit: 'amount',
      data: getData(baseData, 'winter', 'amount'),
    };
    this.chooseSeason = this.chooseSeason.bind(this);
    this.chooseCredit = this.chooseCredit.bind(this);
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
      <Button style={{ marginRight: '5px', textTransform: 'capitalize' }} variant="contained" color="primary" onClick={() => this.chooseSeason(season)}>
        {season}
      </Button>
    );
  }

  secondaryButton(credit) {
    return (
      <Button style={{ marginRight: '5px', textTransform: 'capitalize' }} variant="contained" onClick={() => this.chooseCredit(credit)}>
        {credit}
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
            valueField="amountUSA"
            argumentField="year"
            name="USA"
          />
          <BarSeries
            valueField="amountUSSR"
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
          <Typography gutterBottom variant="headline" style={{ textTransform: 'capitalize' }}>
            {`${season} olympic games (${credit})`}
          </Typography>
          <Typography variant="subheading" style={{ marginBottom: '10px' }}>
            Choose the season of the Olympic Games and the type of medal
          </Typography>
          <div style={{ align: 'left', display: 'inline-block' }}>
            {createButton('summer', this.chooseSeason)}
            {createButton('winter', this.chooseSeason)}
          </div>
          <div style={{ float: 'right', display: 'inline-block' }}>
            {this.secondaryButton('amount')}
            {this.secondaryButton('gold')}
            {this.secondaryButton('silver')}
            {this.secondaryButton('bronze')}
          </div>
        </CardContent>
      </Card>
    );
  }
}
