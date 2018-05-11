import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { findSeriesByName, coordinates, xyScales } from '@devexpress/dx-chart-core';

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
        placeholder,
        name,
        point,
        barWidth,
        groupWidth,
        ...restProps
      } = this.props;
      return (
        <Plugin name={pluginName}>
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
                  axisName: domainName,
                  argumentField,
                  valueField,
                  stack,
                } = findSeriesByName(name, series);
                const scales = xyScales(
                  domains,
                  argumentAxisName,
                  domainName,
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
                      {...processLine(pathType, coord, scales)}
                      {...restProps}
                    />
                    {
                      coord.map(item =>
                        (
                          <WrappedPoint
                            key={item.id.toString()}
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
    placeholder: PropTypes.string,
    point: PropTypes.object,
    barWidth: PropTypes.number,
    groupWidth: PropTypes.number,
  };
  Component.defaultProps = {
    placeholder: 'pane',
    point: { size: 7 },
    barWidth: 0.9,
    groupWidth: 0.7,
  };
  return Component;
};
