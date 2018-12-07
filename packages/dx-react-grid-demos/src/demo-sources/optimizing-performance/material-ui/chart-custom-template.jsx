import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connectProps } from '@devexpress/dx-react-core';
import {
  Scale, EventTracker, SelectionState,
} from '@devexpress/dx-react-chart';
import {
  Chart,
  SplineSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { energyConsumption as data } from '../../../../../dx-react-chart-demos/src/demo-data/data-vizualization';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    marginBottom: theme.spacing.unit,
    whiteSpace: 'nowrap',
    fontSize: '20px',
    color: 'gray',
  },
  selectedSeries: {
    fontWeight: 'bold',
    color: 'back',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column-reverse',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, selectedSeriesName, ...restProps }) => {
  debugger;
  return (
    <div
      {...restProps}
      className={classNames({
        [classes.label]: true,
        [classes.selectedSeries]: selectedSeriesName === restProps.text,
      })}
    >
      {restProps.text}
    </div>
  );
};
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item
    {...restProps}
    className={classes.item}
  />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);

const compare = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;

const Spline = props => <SplineSeries.Path {...props} strokeWidth={8} />;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      selection: [],
    };

    this.click = ({ targets }) => {
      const target = targets[0];
      if (target) {
        this.setState(({ selection }) => ({
          selection: selection[0] && compare(selection[0], target) ? [] : [target],
        }));
      }
    };

    this.legendLabel = connectProps(Label, () => {
      const { selection } = this.state;
      const selectedSeriesName = selection[0] ? selection[0].series : undefined;
      return ({
        selectedSeriesName,
      });
    });
  }

  componentDidUpdate() {
    this.legendLabel.update();
  }

  render() {
    const { data: chartData, selection } = this.state;

    console.log(selection);
    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <SplineSeries
            name="Hydro-electric"
            valueField="hydro"
            argumentField="country"
            seriesComponent={Spline}
          />
          <SplineSeries
            name="Oil"
            valueField="oil"
            argumentField="country"
          />
          <SplineSeries
            name="Natural gas"
            valueField="gas"
            argumentField="country"
          />
          <SplineSeries
            name="Coal"
            valueField="coal"
            argumentField="country"
          />
          <SplineSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
          />
          <Legend
            position="bottom"
            rootComponent={Root}
            itemComponent={Item}
            labelComponent={this.legendLabel}
          />
          <Scale />

          <EventTracker onClick={this.click} />
          <SelectionState selection={selection} />
        </Chart>
      </Paper>
    );
  }
}
