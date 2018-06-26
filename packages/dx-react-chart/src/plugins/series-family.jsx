import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { processData, seriesWithStacks, stacks } from '@devexpress/dx-chart-core';

const computedSeries = ({ series = [] }) => seriesWithStacks(series);
const computedStacks = ({ series = [] }) => stacks(series);

// eslint-disable-next-line react/prefer-stateless-function
export class SeriesFamily extends React.PureComponent {
  render() {
    return (
      <Plugin name="SeriesFamily" >
        <Getter name="series" computed={computedSeries} />
        <Getter name="processingData" value={processData} />
        <Getter name="stacks" computed={computedStacks} />
      </Plugin>
    );
  }
}
