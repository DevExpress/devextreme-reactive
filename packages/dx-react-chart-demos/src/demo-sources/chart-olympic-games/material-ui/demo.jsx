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
import { withStyles } from '@material-ui/core/styles';
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

const buttonComponent = (className, text, handler) => (
  <Button
    variant="contained"
    color="primary"
    onClick={() => handler(text)}
    className={className}
  >
    {text}
  </Button>
);

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

const legendRootBase = ({
  classes,
  ...props
}) => <Legend.Root className={classes.root} {...props} />;

const legendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);

const demoStyles = theme => ({
  title: {
    textTransform: 'capitalize',
  },
  text: {
    marginBottom: theme.spacing.unit,
  },
  leftBlock: {
    align: 'left',
    display: 'inline-block',
  },
  rightBlock: {
    float: 'right',
    display: 'inline-block',
  },
  button: {
    marginRight: theme.spacing.unit * 2 / 3,
    textTransform: 'capitalize',
  },
});

class DemoBase extends React.PureComponent {
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

  render() {
    const { data, credit, season } = this.state;
    const { classes } = this.props;

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
            rootComponent={legendRoot}
          />
        </Chart>

        <CardContent>
          <Typography gutterBottom variant="headline" className={classes.title}>
            {`${season} olympic games (${credit})`}
          </Typography>
          <Typography variant="subheading" className={classes.text}>
            Choose the season of the Olympic Games and the type of medal
          </Typography>
          <div className={classes.leftBlock}>
            {buttonComponent(classes.button, 'summer', this.chooseSeason)}
            {buttonComponent(classes.button, 'winter', this.chooseSeason)}
          </div>
          <div className={classes.rightBlock}>
            {buttonComponent(classes.button, 'amount', this.chooseCredit)}
            {buttonComponent(classes.button, 'gold', this.chooseCredit)}
            {buttonComponent(classes.button, 'silver', this.chooseCredit)}
            {buttonComponent(classes.button, 'bronze', this.chooseCredit)}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(DemoBase);
