import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { findSeriesByName, coordinates, xyScales, seriesData } from '@devexpress/dx-chart-core';

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
      const getSeriesDataComputed = ({ series }) =>
        seriesData(series, {
          valueField, argumentField, name, axisName, stack: stackProp,
        });
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeriesDataComputed} />
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
                width,
                height,
              }) => {
                const {
                  stack,
                } = findSeriesByName(name, series);
                const scales = xyScales(
                  domains,
                  argumentAxisName,
                  axisName,
                  layouts.pane || { width, height },
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
                      {...processLine(pathType, scales)}
                      {...{ coordinates: coord }}
                      {...restProps}
                    />
                    {
                      coord.map(item =>
                        (
                          <WrappedPoint
                            key={item.id.toString()}
                            {...{ value: item.value }}
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
    name: PropTypes.string.isRequired,
    point: PropTypes.object,
    barWidth: PropTypes.number,
    groupWidth: PropTypes.number,
    valueField: PropTypes.string.isRequired,
    argumentField: PropTypes.string.isRequired,
    axisName: PropTypes.string.isRequired,
    stack: PropTypes.string,
  };
  Component.defaultProps = {
    stack: undefined,
    point: { size: 7 },
    barWidth: 0.9,
    groupWidth: 0.7,
  };
  return Component;
};
