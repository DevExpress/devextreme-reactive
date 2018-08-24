import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
  Grid,
} from '@devexpress/dx-react-chart-material-ui';
import { Scale } from '@devexpress/dx-react-chart';

import { confidence as data } from '../../../demo-data/data-vizualization';

const format = () => tick => tick;

const Root = props => (
  <Legend.Root
    {...props}
    style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%',
    }}
  />
);
const Item = props => (
  <Legend.Item
    {...props}
    style={{ flexDirection: 'column', width: 'auto' }}
  />
);
const Label = props => (
  <Legend.Label
    {...props}
    style={{ marginTop: '8px' }}
  />
);
const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
          style={{ paddingRight: '20px' }}
        >
          <ArgumentAxis name="argumentAxis" tickFormat={format} />
          <ValueAxis max={50} labelComponent={ValueLabel} />
          <Grid />

          <LineSeries
            name="TV news"
            valueField="tvNews"
            argumentField="year"
          />
          <LineSeries
            name="Church"
            valueField="church"
            argumentField="year"
          />
          <LineSeries
            name="Military"
            valueField="military"
            argumentField="year"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
            style={{
              textAlign: 'center', width: '100%', marginBottom: '10px', whiteSpace: 'pre',
            }}
          />
          <Scale />
        </Chart>
      </Paper>
    );
  }
}
