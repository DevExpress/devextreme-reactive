import * as React from 'react';
import { Axis as AxisBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';

export class ValueAxis extends React.PureComponent {
  render() {
    return (
      <AxisBase
        rootComponent={Root}
        tickComponent={Tick}
        labelComponent={Label}
        lineComponent={Line}
        {...{ position: 'left', ...this.props }}
      />
    );
  }
}

ValueAxis.Root = Root;
ValueAxis.Tick = Tick;
ValueAxis.Label = Label;
ValueAxis.Line = Line;
