import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
  ValueGrid,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { Stack, Scale, Animation } from '@devexpress/dx-react-chart';
import { stackOffsetExpand } from 'd3-shape';
import { carbonEmmision as data } from '../../../demo-data/data-vizualization';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  typography: {
    marginTop: '0px',
    marginBottom: '8px',
  },
  div: {
    width: '200px',
    marginLeft: '50px',
    paddingBottom: '30px',
  },
});

const format = () => tick => tick;
const formatForFullstack = scale => scale.tickFormat(null, '%');
const EmptyComponent = () => null;

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      offset: null,
      valueFormat: null,
    };

    this.changeSeriesType = this.changeSeriesType.bind(this);
  }

  changeSeriesType(e) {
    if (e.target.value === '1') {
      this.setState({ offset: null, valueFormat: null });
    } else {
      this.setState({ offset: stackOffsetExpand, valueFormat: formatForFullstack });
    }
  }

  render() {
    const {
      data: chartData, offset, valueFormat,
    } = this.state;
    const { classes } = this.props;
    return (
      <Paper>
        <Chart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis tickFormat={valueFormat} lineComponent={EmptyComponent} tickSize={0} />
          <ValueGrid />
          <AreaSeries
            name="Liquids"
            valueField="liquids"
            argumentField="year"
            stack="a"
          />
          <AreaSeries
            name="Solids"
            valueField="solids"
            argumentField="year"
            stack="a"
          />
          <AreaSeries
            name="Gas"
            valueField="gas"
            argumentField="year"
            stack="a"
          />
          <AreaSeries
            name="Cement Production"
            valueField="cementProduction"
            argumentField="year"
            stack="a"
          />
          <AreaSeries
            name="Gas Flaring"
            valueField="gasFlaring"
            argumentField="year"
            stack="a"
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Carbon Emission Estimates" className={classes.title} />
          <Scale />
          <Stack offset={offset} />
        </Chart>
        <div className={classes.div}>
          <Typography component="h5" variant="headline" className={classes.typography}>Series Type</Typography>
          <FormControl>
            <NativeSelect onChange={this.changeSeriesType} defaultValue={1}>
              <option value={1}>Stacked Area</option>
              <option value={2}>Fullstacked Area</option>
            </NativeSelect>
          </FormControl>
        </div>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
