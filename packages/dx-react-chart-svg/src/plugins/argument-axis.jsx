import * as React from 'react';
import { Axis as AxisBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';

export class ArgumentAxis extends React.PureComponent {
  render() {
    return (
      <AxisBase
        rootComponent={Root}
        tickComponent={Tick}
        labelComponent={Label}
        lineComponent={Line}
        {...this.props}
      />
    );
  }
}

ArgumentAxis.Root = Root;
ArgumentAxis.Tick = Tick;
ArgumentAxis.Label = Label;
ArgumentAxis.Line = Line;
