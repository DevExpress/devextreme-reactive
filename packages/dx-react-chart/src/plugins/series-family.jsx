import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { processData, seriesWithStacks, stacks } from '@devexpress/dx-chart-core';

const computedSeries = ({ series = [] }) => seriesWithStacks(series);

// eslint-disable-next-line react/prefer-stateless-function
export class SeriesFamily extends React.PureComponent {
  render() {
    const { stackOffset, stackOrder, seriesStack } = this.props;
    const computedStacks = ({ series = [] }) => stacks(series, seriesStack);
    return (
      <Plugin name="SeriesFamily" >
        <Getter name="series" computed={computedSeries} />
        <Getter name="processingData" value={processData(stackOffset, stackOrder)} />
        <Getter name="stacks" computed={computedStacks} />
      </Plugin>
    );
  }
}

SeriesFamily.propTypes = {
  stackOffset: PropTypes.func,
  stackOrder: PropTypes.func,
  seriesStack: PropTypes.func,
};

SeriesFamily.defaultProps = {
  stackOffset: undefined,
  stackOrder: undefined,
  seriesStack: undefined,
};
