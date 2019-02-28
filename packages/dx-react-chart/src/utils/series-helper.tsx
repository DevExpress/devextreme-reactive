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
import {
  ExtraSeriesParameters, SeriesProps, PathComponentProps, Scales,
} from '../types';

/** @internal */
export const declareSeries = <T extends SeriesProps>(
  pluginName: string,
  { components, getPointTransformer, createHitTester }: ExtraSeriesParameters,
): React.ComponentType<T> => {
  class Component extends React.PureComponent<T> {
    static components: PluginComponents;
    static defaultProps: Partial<SeriesProps> = {
      name: 'defaultSeriesName',
    };

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
                const currentScales: Scales = {
                  xScale: scales[ARGUMENT_DOMAIN],
                  yScale: scales[getValueDomainName(currentSeries!.scaleName)],
                };
                const Path: React.ComponentType<PathComponentProps> =
                  currentSeries.seriesComponent as any;
                return (
                  <Path
                    index={currentSeries.index}
                    pointComponent={currentSeries.pointComponent}
                    coordinates={currentSeries.points as any}
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
  Component.components = {};
  if (components.Path) {
    Component.components.seriesComponent = 'Path';
  }
  if (components.Point) {
    Component.components.pointComponent = 'Point';
  }
  return withComponents(components)(Component);
};
