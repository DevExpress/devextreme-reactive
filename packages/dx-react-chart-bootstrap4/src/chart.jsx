import { Chart as ChartBase, withComponents, withPatchedProps } from '@devexpress/dx-react-chart';
import { Root } from './templates/layout';

const palette = ['#0070ff', '#d72e3d', '#249d3d', '#ffb90c', '#1698af', '#616a72'];

const ChartWithPalette = withPatchedProps(props => ({
  palette,
  ...props,
}))(ChartBase);

ChartWithPalette.components = ChartBase.components;

export const Chart = withComponents({ Root })(ChartWithPalette);
