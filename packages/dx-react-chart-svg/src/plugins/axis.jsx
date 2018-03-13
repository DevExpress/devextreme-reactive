import * as React from 'react';
import { Axis as AxisBase } from '@devexpress/dx-react-chart';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';

export class Axis extends React.PureComponent {
  render() {
    return (
      <AxisBase
        tickComponent={Tick}
        labelComponent={Label}
        lineComponent={Line}
        {...this.props}
      />
    );
  }
}

Axis.Tick = Tick;
Axis.Label = Label;
Axis.Line = Line;
