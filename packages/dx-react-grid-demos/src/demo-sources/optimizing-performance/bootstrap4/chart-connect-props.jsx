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
} from '@devexpress/dx-react-chart-bootstrap4';
import { energyConsumption as data } from '../../../demo-data/chart-data';

const LegendRoot = ({ classes, ...restProps }) => (
  <Legend.Root
    {...restProps}
    style={{
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    }}
  />
);
const LegendLabel = ({
  classes, selectedSeriesName, text, ...restProps
}) => (
  <div
    {...restProps}
    style={{
      marginBottom: '8px',
      whiteSpace: 'nowrap',
      fontSize: '20px',
      color: 'gray',
      ...selectedSeriesName === text ? {
        fontWeight: 'bold',
        color: 'black',
      } : {},
    }}
  >
    {text}
  </div>
);
const LegendItem = ({ classes, ...restProps }) => (
  <Legend.Item
    {...restProps}
    style={{
      flexDirection: 'column-reverse',
    }}
  />
);

const compare = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      selection: [{
        series: 'Oil', distance: 1,
      }],
    };

    this.click = ({ targets }) => {
      const target = targets[0];
      if (target) {
        this.setState(({ selection }) => ({
          selection: selection[0] && compare(selection[0], target) ? [] : [target],
        }));
      }
    };

    this.legendLabel = connectProps(LegendLabel, () => {
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
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
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
