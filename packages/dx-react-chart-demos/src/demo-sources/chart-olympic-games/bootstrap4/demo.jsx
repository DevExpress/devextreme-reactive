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
const getData = (data, currentType, currentCredit) => {
  const newData = [];
  data.forEach((item) => {
    if (item[currentType]) {
      const year = getOlympicData(item, currentType, currentCredit);
      newData.push(year);
    }
  });
  return newData;
};
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      season: 'summer',
      credit: 'summ',
      data: getData(baseData, 'summer', 'summ'),
      rSelected: 'summer',
      dSelected: 'summ',
    };
  }


  chooseSeason(event) {
    const { credit } = this.state;
    this.setState({
      data: getData(baseData, event.target.value, credit),
      season: event.target.value,
      rSelected: event.target.value,
    });
  }

  chooseCredit(event) {
    const { season } = this.state;
    this.setState({
      data: getData(baseData, season, event.target.value),
      credit: event.target.value,
      dSelected: event.target.value,
    });
  }


  render() {
    const {
      data, season, credit, rSelected, dSelected,
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
            <Button style={{ marginRight: '5px' }} color="secondary" value="summer" onClick={event => this.chooseSeason(event)} active={rSelected === 'summer'}>
              Summer
            </Button>
            {' '}
            <Button color="secondary" value="winter" onClick={event => this.chooseSeason(event)} active={rSelected === 'winter'}>
              Winter
            </Button>
            {' '}
            <h3>
              Choose the type of medal credit
            </h3>
            <Button style={{ marginRight: '5px' }} color="secondary" value="summ" onClick={event => this.chooseCredit(event)} active={dSelected === 'summ'}>
              Summ
            </Button>
            {' '}
            <Button style={{ marginRight: '5px' }} color="secondary" value="gold" onClick={event => this.chooseCredit(event)} active={dSelected === 'gold'}>
              Gold
            </Button>
            {' '}
            <Button style={{ marginRight: '5px' }} color="secondary" value="silver" onClick={event => this.chooseCredit(event)} active={dSelected === 'silver'}>
              Silver
            </Button>
            {' '}
            <Button color="secondary" value="bronze" onClick={event => this.chooseCredit(event)} active={dSelected === 'bronze'}>
              Bronze
            </Button>
            {' '}
          </Jumbotron>
        </div>
      </div>
    );
  }
}
