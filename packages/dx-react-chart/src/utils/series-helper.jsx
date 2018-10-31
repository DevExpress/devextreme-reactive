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
  findSeriesByName, addSeries, getValueDomainName, ARGUMENT_DOMAIN,
} from '@devexpress/dx-chart-core';
import { withComponents } from './series-component';

// May be it is better to say what props are passed along rather then what are NOT passed?
const getRenderProps = (series) => {
  const {
    name,
    uniqueName,
    axisName,
    argumentField,
    valueField,
    palette,
    symbolName,
    isStartedFromZero,
    getValueDomain, // TODO: Temporary - see corresponding note in *computeDomains*.
    createHitTester,
    ...restProps
  } = series;

  return restProps;
};

export const declareSeries = (pluginName, { components, ...parameters }) => {
  class Component extends React.PureComponent {
    render() {
      const { name } = this.props;
      const symbolName = Symbol(name);
      const seriesItem = {
        ...parameters,
        ...this.props,
        symbolName,
      };
      const getSeries = ({ series, data, palette }) => addSeries(series, data, palette, seriesItem);
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeries} />
          <Template name="series">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({ series, scales, getAnimatedStyle }) => {
                const currentSeries = findSeriesByName(symbolName, series);
                const currentScales = {
                  xScale: scales[ARGUMENT_DOMAIN],
                  yScale: scales[getValueDomainName(currentSeries.axisName)],
                };
                const { seriesComponent: Series, points, ...props } = getRenderProps(currentSeries);
                return (
                  <Series
                    coordinates={points}
                    scales={currentScales}
                    getAnimatedStyle={getAnimatedStyle}
                    {...props}
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
    /* eslint-disable react/no-unused-prop-types */
    valueField: PropTypes.string.isRequired,
    argumentField: PropTypes.string.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  };
  Component.defaultProps = {
    name: 'defaultSeriesName',
  };
  Component.components = {};
  if (components.Path) {
    Component.components.seriesComponent = 'Path';
  }
  if (components.Point) {
    Component.components.pointComponent = 'Point';
  }
  return withComponents(components)(Component);
};
