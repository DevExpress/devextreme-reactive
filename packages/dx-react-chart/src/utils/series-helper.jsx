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
  pathType,
  calculateCoordinates,
) => {
  class Component extends React.PureComponent {
    render() {
      const {
        name,
        valueField,
        argumentField,
        axisName,
        stack: stackProp,
        color,
        groupWidth,
        ...restProps
      } = this.props;

      const symbolName = Symbol(name);
      const getSeriesDataComputed = ({ series }) => seriesData(series, {
        valueField,
        argumentField,
        name,
        symbolName,
        axisName,
        stack: stackProp,
        color,
        uniqueName: name,
      });
      const startFromZeroByAxes = (
        { startFromZero = {} },
      ) => checkZeroStart(startFromZero, axisName, pathType);
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeriesDataComputed} />
          <Getter name="startFromZero" computed={startFromZeroByAxes} />
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
                pieColorDomain,
              }) => {
                const {
                  stack, uniqueName,
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
                    uniqueName={uniqueName}
                    colorDomain={pluginName === 'PieSeries' ? pieColorDomain : colorDomain}
                    coordinates={calculatedCoordinates}
                    color={color}
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
