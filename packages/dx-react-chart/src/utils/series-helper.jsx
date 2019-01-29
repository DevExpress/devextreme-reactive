import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
  withComponents,
} from '@devexpress/dx-react-core';
import {
  findSeriesByName, addSeries, getValueDomainName, ARGUMENT_DOMAIN,
} from '@devexpress/dx-chart-core';

export const declareSeries = (pluginName, { components, getPointTransformer, createHitTester }) => {
  class Component extends React.PureComponent {
    render() {
      const {
        name,
        argumentField,
        valueField,
        scaleName,
        seriesComponent,
        pointComponent,
        color,
        ...restProps
      } = this.props;
      const symbolName = Symbol(name);
      const seriesItem = {
        getPointTransformer,
        createHitTester,
        ...this.props,
        symbolName,
      };
      const getSeries = ({
        series,
        data,
        palette,
      }) => addSeries(series, data, palette, seriesItem, restProps);
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
                  yScale: scales[getValueDomainName(currentSeries.scaleName)],
                };
                return (
                  <currentSeries.seriesComponent
                    index={currentSeries.index}
                    pointComponent={currentSeries.pointComponent}
                    coordinates={currentSeries.points}
                    state={currentSeries.state}
                    color={currentSeries.color}
                    scales={currentScales}
                    getAnimatedStyle={getAnimatedStyle}
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
    scaleName: PropTypes.string,
    seriesComponent: PropTypes.func.isRequired,
    pointComponent: PropTypes.func,
    color: PropTypes.string,
    /* eslint-disable react/no-unused-prop-types */
    valueField: PropTypes.string.isRequired,
    argumentField: PropTypes.string.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  };
  Component.defaultProps = {
    name: 'defaultSeriesName',
    scaleName: undefined,
    pointComponent: undefined,
    color: undefined,
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
