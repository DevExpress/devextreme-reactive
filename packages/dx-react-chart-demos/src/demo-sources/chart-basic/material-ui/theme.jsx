import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
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

const PREFIX = 'Demo';

const classes = {
  typography: `${PREFIX}-typography`,
  div: `${PREFIX}-div`,
  item: `${PREFIX}-item`,
  schemeConteiner: `${PREFIX}-schemeConteiner`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.div}`]: {
    width: '200px',
    marginLeft: '50px',
    paddingBottom: '30px',
  },
  [`&.${classes.item}`]: {
    width: '40px',
    height: '40px',
  },
  [`&.${classes.schemeConteiner}`]: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [`&.${classes.typography}`]: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
  },
}));

const data = [];
for (let i = 0; i < 15; i += 1) {
  data.push({ category: `item${i}`, val: 1 });
}

export default class Demo extends React.PureComponent {
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
        <StyledDiv className={classes.schemeConteiner}>
          {scheme.map(color => (
            <StyledDiv
              key={color}
              className={classes.item}
              style={{ backgroundColor: color }}
            />
          ))}
        </StyledDiv>
        <StyledDiv className={classes.div}>
          <StyledTypography component="h5" variant="h5" className={classes.typography}>Scheme</StyledTypography>
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
        </StyledDiv>
      </Paper>
    );
  }
}
