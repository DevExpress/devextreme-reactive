import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { axisName, prepareData } from '@devexpress/dx-chart-core';

export class ChartCore extends React.PureComponent {
  render() {
    const {
      data,
    } = this.props;
    const getArgumentAxisName = ({ argumentAxisName }) => axisName(argumentAxisName);
    const processedData = ({ series, processingData }) => prepareData(data, series, processingData);
    const calculatedDomains = ({
      axes, series, data: chartData, argumentAxisName, startFromZero, computedDomain,
    }) => computedDomain(axes, series, chartData, argumentAxisName, startFromZero);
    return (
      <Plugin>
        <Getter name="data" computed={processedData} />
        <Getter name="argumentAxisName" computed={getArgumentAxisName} />
        <Getter name="domains" computed={calculatedDomains} />
      </Plugin>
    );
  }
}

ChartCore.propTypes = {
  data: PropTypes.array.isRequired,
};
