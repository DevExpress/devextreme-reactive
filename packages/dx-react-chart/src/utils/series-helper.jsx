import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  findSeriesByName, xyScales, seriesData, checkZeroStart,
} from '@devexpress/dx-chart-core';

export const withSeriesPlugin = (
  Series,
  pluginName,
  pathType, // TODO: Replace it with bool - `isStartedFromZero`.
  calculateCoordinates,
  getItems = series => series,
) => {
  class Component extends React.PureComponent {
    render() {
      const { name: seriesName, axisName: seriesAxisName } = this.props;
      const symbolName = Symbol(seriesName);
      const getSeriesDataComputed = ({ series }) => seriesData(series, {
        ...this.props,
        symbolName,
        uniqueName: seriesName,
      });
      const startFromZeroByAxes = (
        { startFromZero = {} },
      ) => checkZeroStart(startFromZero, seriesAxisName, pathType);
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeriesDataComputed} />
          <Getter name="startFromZero" computed={startFromZeroByAxes} />
          <Getter name="items" value={getItems} />
          <Template name="series">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({
                series,
                domains,
                stacks,
                data,
                argumentAxisName,
                layouts,
                scaleExtension,
                colorDomain,
              }) => {
                const {
                  name, axisName, argumentField, valueField, groupWidth, stack,
                  // It is enumerated here only to prevent it from being passed to Series.
                  symbolName: _,
                  ...restProps
                } = findSeriesByName(symbolName, series);

                const scales = xyScales(
                  domains[argumentAxisName],
                  domains[axisName],
                  layouts.pane,
                  groupWidth,
                  scaleExtension,
                );
                const calculatedCoordinates = calculateCoordinates(
                  data,
                  scales,
                  argumentField,
                  valueField,
                  name,
                  stack,
                  stacks,
                  restProps,
                  scaleExtension,
                );

                return (
                  <Series
                    colorDomain={colorDomain}
                    coordinates={calculatedCoordinates}
                    {...restProps}
                  />
                );
              }}
            </TemplateConnector>
          </Template>
        </Plugin>
      );
    }
  }
  Component.propTypes = {
    name: PropTypes.string,
    valueField: PropTypes.string.isRequired,
    argumentField: PropTypes.string.isRequired,
    axisName: PropTypes.string,
    stack: PropTypes.string,
    color: PropTypes.string,
    groupWidth: PropTypes.number,
  };
  Component.defaultProps = {
    name: 'defaultSeriesName',
    color: undefined,
    axisName: undefined,
    stack: undefined,
    groupWidth: 0.7,
  };
  return Component;
};
