import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { findSeriesByName, coordinates, xyScales, seriesData, checkZeroStart } from '@devexpress/dx-chart-core';

export const withSeriesPlugin = (
  Path,
  Point,
  pluginName,
  pathType,
  processLine,
  processPoint,
  extraOptions,
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
        ...restProps
      } = this.props;

      const uniqueName = Symbol(name);
      const getSeriesDataComputed = ({ series }) =>
        seriesData(series, {
          valueField, argumentField, name, uniqueName, axisName, stack: stackProp, color,
        });
      const startFromZeroByAxes = ({ startFromZero = {} }) =>
        checkZeroStart(startFromZero, axisName, pathType);
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
              }) => {
                const {
                  stack, color: seriesColor,
                } = findSeriesByName(uniqueName, series);
                const options = extraOptions({ ...restProps });
                const scales = xyScales(
                  domains,
                  argumentAxisName,
                  axisName,
                  layouts.pane,
                  stacks,
                  options,
                );
                const coord = coordinates(
                  data,
                  scales,
                  argumentField,
                  valueField,
                  name,
                );
                const pointParameters = processPoint(scales, options, stack);
                return (
                  <React.Fragment>
                    <Path
                      color={seriesColor}
                      coordinates={coord}
                      {...processLine(pathType, scales)}
                      {...restProps}
                    />
                    {
                      coord.map(item =>
                        (
                          <Point
                            color={seriesColor}
                            key={item.id.toString()}
                            value={item.value}
                            {...pointParameters(item)}
                            {...restProps}
                          />
                        ))
                    }
                  </React.Fragment>
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
  };
  Component.defaultProps = {
    name: 'defaultSeriesName',
    color: undefined,
    axisName: undefined,
    stack: undefined,
  };
  return Component;
};
