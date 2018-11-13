import { withComponents } from '@devexpress/dx-react-core';
import { ArgumentAxis as ArgumentAxisBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/axis/root';
import { Tick } from '../templates/axis/tick';
import { Label } from '../templates/axis/label';
import { Line } from '../templates/axis/line';

export const ArgumentAxis = withComponents({
  Root, Tick, Label, Line,
})(ArgumentAxisBase);
