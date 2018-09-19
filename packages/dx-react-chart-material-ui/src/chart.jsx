import { Chart as ChartBase, withComponents, withPatchedProps } from '@devexpress/dx-react-chart';
import { Root } from './templates/layout';

const palette = ['#40C4FF', '#FF5252', '#00C853', '#FFEB3B', '#FF4081', '#E040FB'];

const ChartWithPalette = withPatchedProps(props => ({
  palette,
  ...props,
}))(ChartBase);

ChartWithPalette.components = ChartBase.components;

export const Chart = withComponents({ Root })(ChartWithPalette);
