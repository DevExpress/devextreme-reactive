import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import {
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
} from 'd3-scale-chromatic';

import { Palette } from '@devexpress/dx-react-chart';

const schemeCollection = [
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
];

const demoStyles = theme => ({
  typography: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
  div: {
    width: '200px',
    marginLeft: '50px',
    paddingBottom: '30px',
  },
  item: {
    width: '40px',
    height: '40px',
  },
  schemeConteiner: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
});

const data = [];
for (let i = 0; i < 15; i += 1) {
  data.push({ category: `item${i}`, val: 1 });
}

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      scheme: schemeCollection[0],
    };

    this.changeScheme = this.changeScheme.bind(this);
  }

  changeScheme(e) {
    this.setState({ scheme: schemeCollection[e.target.value] });
  }

  render() {
    const { data: chartData, scheme } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <Palette scheme={scheme} />
          <PieSeries
            valueField="val"
            argumentField="category"
          />
        </Chart>
        <div className={classes.schemeConteiner}>
          {scheme.map(color => (
            <div
              key={color}
              className={classes.item}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className={classes.div}>
          <Typography component="h5" variant="h5" className={classes.typography}>Scheme</Typography>
          <FormControl>
            <NativeSelect onChange={this.changeScheme} defaultValue={0}>
              <option value={0}>schemeCategory10</option>
              <option value={1}>schemeAccent</option>
              <option value={2}>schemeDark2</option>
              <option value={3}>schemePaired</option>
              <option value={4}>schemePastel1</option>
              <option value={5}>schemePastel2</option>
              <option value={6}>schemeSet1</option>
              <option value={7}>schemeSet2</option>
              <option value={8}>schemeSet3</option>
            </NativeSelect>
          </FormControl>
        </div>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
