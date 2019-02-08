import * as React from 'react';
import {
  Template,
  Plugin,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
  withComponents,
  Getters,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  findSeriesByName, addSeries, getValueDomainName, ARGUMENT_DOMAIN,
} from '@devexpress/dx-chart-core';

const defaultProps = {
  name: 'defaultSeriesName',
};
type ComponentDefaultProps = Readonly<typeof defaultProps>;
type ComponentProps = {
  scaleName?: string,
  seriesComponent: any,
  pointComponent?: any,
  color?: string,
  valueField: string,
  argumentField: string,
} & Partial<ComponentDefaultProps>;

export const declareSeries = (pluginName, { components, getPointTransformer, createHitTester }) => {
  class Component extends React.PureComponent<ComponentProps> {
    static components: PluginComponents;
    static defaultProps = defaultProps;
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
      }: Getters) => addSeries(series, data, palette, seriesItem, restProps);
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
                  yScale: scales[getValueDomainName(currentSeries!.scaleName)],
                };
                return (
                  <currentSeries.seriesComponent
                    index={currentSeries!.index}
                    pointComponent={currentSeries!.pointComponent}
                    coordinates={currentSeries!.points}
                    state={currentSeries!.state}
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
  Component.components = {};
  if (components.Path) {
    Component.components.seriesComponent = 'Path';
  }
  if (components.Point) {
    Component.components.pointComponent = 'Point';
  }
  return withComponents(components)(Component);
};
