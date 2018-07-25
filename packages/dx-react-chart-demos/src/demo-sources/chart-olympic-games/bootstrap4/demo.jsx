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


const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const getOlympicData = (chartData, currentType, currentCredit) => ({
  year: chartData.year,
  summUSA: chartData[currentType].usa[currentCredit],
  summUSSR: chartData[currentType].ussr[currentCredit],
});
/* const getData = (data, currentType, currentCredit) => {
  const newData = [];
  data.forEach((item) => {
    if (item[currentType]) {
      const year = getOlympicData(item, currentType, currentCredit);
      newData.push(year);
    }
  });
  return newData;
}; */
const getData = (data, currentType, currentCredit) => data
  .slice()
  .reduce((acc, item) => {
    if (item[currentType]) {
      const year = getOlympicData(item, currentType, currentCredit);
      acc.push(year);
    } return acc;
  }, []);
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      season: 'summer',
      credit: 'summ',
      data: getData(baseData, 'summer', 'summ'),

    };
  }


  chooseSeason(event) {
    const { credit } = this.state;
    this.setState({
      data: getData(baseData, event.target.value, credit),
      season: event.target.value,

    });
  }

  chooseCredit(event) {
    const { season } = this.state;
    this.setState({
      data: getData(baseData, season, event.target.value),
      credit: event.target.value,

    });
  }

  primaryButton(season) {
    return (
      <Button style={{ marginRight: '5px' }} color="secondary" value={season} onClick={event => this.chooseSeason(event)}>
        {capitalizeFirstLetter(season)}
      </Button>
    );
  }

  secondaryButton(credit) {
    return (
      <Button style={{ marginRight: '5px' }} color="secondary" value={credit} onClick={event => this.chooseCredit(event)}>
        {capitalizeFirstLetter(credit)}
      </Button>
    );
  }

  render() {
    const {
      data, season, credit,
    } = this.state;
    return (
      <div>

        <Card>
          <Chart data={data}>
            <ArgumentAxis
              type="band"
              name="year"
              tickComponent={() => null}
            />
            <ValueAxis
              tickComponent={() => null}
              lineComponent={() => null}
            />
            <Grid strokeDasharray="10 5" />
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
            <Legend />
            <Title
              text={`${capitalizeFirstLetter(season)} Olympic Games (${capitalizeFirstLetter(credit)})`}
              position="top"
              textComponent={({ text }) => (
                <h1 style={{ margin: '10px auto' }}>
                  {text}
                </h1>
              )}
            />
            <Grid strokeDasharray="10 5" />

          </Chart>

        </Card>
        <div style={{ marginTop: '20px' }}>
          <Jumbotron style={{ padding: '1rem 2rem' }}>
            <h3>
              Choose the season of the Olympic Games
            </h3>
            {this.primaryButton('summer')}
            {this.primaryButton('winter')}
            <h3>
              Choose the type of medal credit
            </h3>
            {this.secondaryButton('summ')}
            {this.secondaryButton('gold')}
            {this.secondaryButton('silver')}
            {this.secondaryButton('bronze')}
          </Jumbotron>
        </div>
      </div>
    );
  }
}
