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
  findSeriesByName, addSeries,
} from '@devexpress/dx-chart-core';

// TODO: Remove it - just pass `true` or `false` to `withSeriesPlugin`.
const isStartedFromZero = pathType => pathType === 'area' || pathType === 'bar';

// May be it is better to say what props are passed along rather then what are NOT passed?
const getRenderProps = (series) => {
  const {
    name,
    uniqueName,
    axisName,
    argumentField,
    valueField,
    palette,
    stack,
    symbolName,
    isStartedFromZero: _,
    getValueDomain, // TODO: Temporary - see corresponding note in *computeDomains*.
    getPointTransformer,
    ...restProps
  } = series;

  return restProps;
};

export const withSeriesPlugin = (
  Series,
  pluginName,
  pathType, // TODO: Replace it with bool - `isStartedFromZero`.
  getPointTransformer,
) => {
  class Component extends React.PureComponent {
    render() {
      const { name: seriesName } = this.props;
      const symbolName = Symbol(seriesName);
      const getSeriesDataComputed = ({ series, palette }) => addSeries(series, palette, {
        ...this.props,
        getPointTransformer,
        isStartedFromZero: isStartedFromZero(pathType),
        symbolName,
      });
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeriesDataComputed} />
          <Template name="series">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({
                getSeriesPoints,
                series,
                scales,
                stacks,
                data,
                scaleExtension,
              }) => {
                const currentSeries = findSeriesByName(symbolName, series);
                const coordinates = getSeriesPoints(
                  currentSeries, data, scales,
                  // TODO: The following are BarSeries specifics - remove them.
                  stacks, scaleExtension,
                );
                const props = getRenderProps(currentSeries);
                return (
                  <Series
                    coordinates={coordinates}
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
  return Component;
};
