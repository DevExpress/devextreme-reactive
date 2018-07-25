import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Grid
} from '@devexpress/dx-react-chart-material-ui';
import { Stack } from '@devexpress/dx-react-chart';
import { olympicsData as baseData } from '../../../demo-data/data-olympics';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      season: 'winter',
      credit: 'summ',
      data: this.getData(baseData, 'winter', 'summ'),
    };
  }

  getOlympicData(chartData, currentType, currentCredit) {
    return { year: chartData.year, summUSA: chartData[currentType].usa[currentCredit], summUSSR: chartData[currentType].ussr[currentCredit] }
  }

  getData(data, currentType, currentCredit) {
    const newData = [];
    data.forEach((item) => {
      if (!!item[currentType]) {
        const year = this.getOlympicData(item, currentType, currentCredit);
        newData.push(year);
      }
    });
    return newData
  }
  chooseSeason(season) {
    this.setState({
      data: this.getData(baseData, season, this.state.credit),
      season,
    });
  }
  chooseCredit(credit) {
    this.setState({
      data: this.getData(baseData, this.state.season, credit),
      credit,
    });
  }


  render() {
    const { data } = this.state;
    return (
      <div>
        <Card>
          <CardMedia>
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
              <Grid />
              <BarSeries
                valueField='summUSA'
                argumentField='year'
                name="USA"
              />
              <BarSeries
                valueField='summUSSR'
                argumentField='year'
                name="USSR"
              />
              <Stack />
              <Legend
                position='bottom'
                rootComponent={({ ...restProps }) => <Legend.Root style={{ display: 'flex', margin: 'auto' }} {...restProps} />}
              />
            </Chart>
          </CardMedia>

          <CardContent float='left'>
            <Typography gutterBottom variant="headline" >{`${capitalizeFirstLetter(this.state.season)} Olympic Games (${capitalizeFirstLetter(this.state.credit)})`}</Typography>
            <Typography variant="subheading" style={{ marginBottom: '10px' }}>Choose the season of the Olympic Games and the type of medal</Typography>
            <div style={{align:'left', display:'inline-block'}}>
            <Button style={{ marginRight: '5px' }} variant="contained" color="primary" onClick={() => this.chooseSeason('summer')}>Summer</Button>
            <Button style={{ marginRight: '5px' }} variant="contained" color="primary" onClick={() => this.chooseSeason('winter')}>Winter</Button>
            </div>
            <div style={{float:'right', display:'inline-block'}}>
            <Button style={{ marginRight: '5px' }} variant="contained" onClick={() => this.chooseCredit('summ')} >Summ</Button>
            <Button style={{ marginRight: '5px' }} variant="contained" onClick={() => this.chooseCredit('gold')} >Gold</Button>
            <Button style={{ marginRight: '5px' }} variant="contained" onClick={() => this.chooseCredit('silver')}>Silver</Button>
            <Button  variant="contained" onClick={() => this.chooseCredit('bronze')}>Bronze</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
