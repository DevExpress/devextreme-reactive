import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { buildScales, scaleSeriesPoints } from '@devexpress/dx-chart-core';

const getScales = ({ domains, ranges }: Getters) => buildScales(domains, ranges);

const getSeries = ({ series, scales }: Getters) => scaleSeriesPoints(series, scales);

export class ChartCore extends React.PureComponent {
  render() {
    return (
      <Plugin>
        <Getter name="scales" computed={getScales} />
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}
