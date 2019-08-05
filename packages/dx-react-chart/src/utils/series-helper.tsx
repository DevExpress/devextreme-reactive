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
  findSeriesByName, addSeries, extendDomains, getValueDomainName, ARGUMENT_DOMAIN, ScaleObject,
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
      const getDomains = ({
        series,
        domains,
      }: Getters) => extendDomains(domains, findSeriesByName(symbolName, series));
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeries} />
          <Getter name="domains" computed={getDomains} />
          <Template name="series">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({ series, scales, getAnimatedStyle, rotated, layouts, clipPathId }) => {
                const currentSeries = findSeriesByName(symbolName, series);
                const argScale: ScaleObject = scales[ARGUMENT_DOMAIN];
                const valScale: ScaleObject = scales[getValueDomainName(currentSeries!.scaleName)];
                // TODO_THIS: This code is expected to be removed when frame animation is used.
                const currentScales: Scales = {
                  xScale: rotated ? valScale : argScale,
                  yScale: rotated ? argScale : valScale,
                };
                const Path: React.ComponentType<PathComponentProps> =
                  currentSeries.seriesComponent as any;
                return (
                  <Path
                    index={currentSeries.index}
                    pointComponent={currentSeries.pointComponent}
                    coordinates={currentSeries.points as any}
                    rotated={rotated}
                    state={currentSeries.state}
                    color={currentSeries.color}
                    scales={currentScales}
                    getAnimatedStyle={getAnimatedStyle}
                    pane={layouts.pane}
                    clipPathId={clipPathId}
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
