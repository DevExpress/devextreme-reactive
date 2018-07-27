import React from 'react';
import { Card, Jumbotron, Button } from 'reactstrap';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Stack } from '@devexpress/dx-react-chart';
import { olympicsData as baseData } from '../../../demo-data/data-olympics';

const getOlympicData = (chartData, currentType, currentCredit) => ({
  year: chartData.year,
  amountUSA: chartData[currentType].usa[currentCredit],
  amountUSSR: chartData[currentType].ussr[currentCredit],
});

const getData = (data, currentType, currentCredit) => data
  .filter(item => item[currentType])
  .map(item => getOlympicData(item, currentType, currentCredit));

const nullComponent = () => null;

const createButton = (text, handler) => (
  <Button className="mr-1 text-capitalize" variant="contained" color="primary" onClick={() => handler(text)}>
    {text}
  </Button>
);

const titleTextComponent = props => (
  <Title.Text className="m-auto pb-3 text-capitalize" {...props} />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      season: 'summer',
      credit: 'amount',
      data: getData(baseData, 'summer', 'amount'),
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

  render() {
    const {
      data, season, credit,
    } = this.state;

    return (
      <React.Fragment>
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
            <Grid strokeDasharray="10 10" />
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
            <Legend />
            <Title
              text={`${season} olympic games (${credit})`}
              position="top"
              textComponent={titleTextComponent}
            />
          </Chart>
        </Card>

        <Jumbotron className="p-4 mt-3">
          <h3>
            Choose the season of the Olympic Games
          </h3>
          {createButton('summer', this.chooseSeason)}
          {createButton('winter', this.chooseSeason)}
          <h3>
            Choose the type of medal credit
          </h3>
          {createButton('amount', this.chooseCredit)}
          {createButton('gold', this.chooseCredit)}
          {createButton('silver', this.chooseCredit)}
          {createButton('bronze', this.chooseCredit)}
        </Jumbotron>
      </React.Fragment>
    );
  }
}
