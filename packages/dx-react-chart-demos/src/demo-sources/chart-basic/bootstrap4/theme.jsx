import * as React from 'react';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
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
      <div className="card">
        <Chart
          data={chartData}
        >
          <Palette scheme={scheme} />
          <PieSeries
            valueField="val"
            argumentField="category"
          />
        </Chart>
        <div className="d-flex justify-content-center mt-3">
          {scheme.map(color => <div key={color} style={{ width: '40px', height: '40px', backgroundColor: color }} />)}
        </div>
        <div className="pb-5 pl-5 w-200" style={{ width: '200px' }}>
          <h5>Scheme</h5>
          <select className="custom-select" onChange={this.changeScheme}>
            <option defaultValue value={0}>schemeCategory10</option>
            <option value={1}>schemeAccent</option>
            <option value={2}>schemeDark2</option>
            <option value={3}>schemePaired</option>
            <option value={4}>schemePastel1</option>
            <option value={5}>schemePastel2</option>
            <option value={6}>schemeSet1</option>
            <option value={7}>schemeSet2</option>
            <option value={8}>schemeSet3</option>
          </select>
        </div>
      </div>
    );
  }
}
