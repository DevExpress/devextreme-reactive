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

export const baseSeries = (
  WrappedPath,
  WrappedPoint,
  pluginName,
  pathType,
  processLine,
  processPoint,
) => {
  class Component extends React.PureComponent {
    render() {
      const {
        name,
        point,
        barWidth,
        groupWidth,
        valueField,
        argumentField,
        axisName,
        stack: stackProp,
        ...restProps
      } = this.props;

      const uniqueName = Symbol(name);
      const getSeriesDataComputed = ({ series }) =>
        seriesData(series, {
          valueField, argumentField, name, uniqueName, axisName, stack: stackProp,
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
                  stack, themeColor,
                } = findSeriesByName(uniqueName, series);
                const scales = xyScales(
                  domains,
                  argumentAxisName,
                  axisName,
                  layouts.pane,
                  stacks,
                  groupWidth,
                  barWidth,
                );
                const coord = coordinates(
                  data,
                  scales,
                  argumentField,
                  valueField,
                  name,
                );
                const { size } = point;
                const pointParameters = processPoint(scales, size, stack);
                return (
                  <React.Fragment>
                    <WrappedPath
                      themeColor={themeColor}
                      coordinates={coord}
                      {...processLine(pathType, scales)}
                      {...restProps}
                    />
                    {
                      coord.map(item =>
                        (
                          <WrappedPoint
                            themeColor={themeColor}
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
    point: PropTypes.object,
    barWidth: PropTypes.number,
    groupWidth: PropTypes.number,
    valueField: PropTypes.string.isRequired,
    argumentField: PropTypes.string.isRequired,
    axisName: PropTypes.string,
    stack: PropTypes.string,
  };
  Component.defaultProps = {
    name: 'defaultSeriesName',
    axisName: undefined,
    stack: undefined,
    point: { size: 7 },
    barWidth: 0.9,
    groupWidth: 0.7,
  };
  return Component;
};
