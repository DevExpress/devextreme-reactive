import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { argumentAxisName, processData, calculateSeriesWithStacks } from '@devexpress/dx-chart-core';

export class ChartCore extends React.PureComponent {
  render() {
    const {
      data,
      axes,
      series,
      width,
      height,
      rootComponent: Root,
      ...restProps
    } = this.props;
    const argumentAxis = argumentAxisName(series);
    const { seriesWithStacks, allStacks } = calculateSeriesWithStacks(series);
    const processedData = processData(seriesWithStacks, data);

    return (
      <Plugin>
        <Getter name="data" value={processedData} />
        <Getter name="axes" value={axes} />
        <Getter name="series" value={seriesWithStacks} />
        <Getter name="argumentAxisName" value={argumentAxis} />
        <Getter name="stacks" value={allStacks} />
        <Template name="root">
          <Root width={width} height={height} {...restProps}>
            <TemplatePlaceholder name="canvas" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

ChartCore.propTypes = {
  data: PropTypes.array.isRequired,
  axes: PropTypes.array,
  series: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rootComponent: PropTypes.func.isRequired,
};

ChartCore.defaultProps = {
  axes: [],
};
