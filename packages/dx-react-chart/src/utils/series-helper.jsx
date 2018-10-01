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
  findSeriesByName, seriesData, ARGUMENT_DOMAIN, getValueDomainName,
} from '@devexpress/dx-chart-core';

// TODO: Remove it - just pass `true` or `false` to `withSeriesPlugin`.
const isStartedFromZero = pathType => pathType === 'area' || pathType === 'bar';

// May be it is better to say what props are passed along rather then what are NOT passed?
const getRenderProps = (series) => {
  const {
    name,
    axisName,
    argumentField,
    valueField,
    stack,
    symbolName,
    isStartedFromZero: _,
    getValueDomain, // TODO: Temporary - see corresponding note in *computeDomains*.
    calculateCoordinates,
    ...restProps
  } = series;

  return restProps;
};

export const withSeriesPlugin = (
  Series,
  pluginName,
  pathType, // TODO: Replace it with bool - `isStartedFromZero`.
  calculateCoordinates,
  getItems = series => series,
) => {
  class Component extends React.PureComponent {
    render() {
      const { name: seriesName } = this.props;
      const symbolName = Symbol(seriesName);
      const getSeriesDataComputed = ({ series }) => seriesData(series, {
        ...this.props,
        calculateCoordinates,
        isStartedFromZero: isStartedFromZero(pathType),
        symbolName,
        uniqueName: seriesName,
      });
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeriesDataComputed} />
          <Getter name="items" value={getItems} />
          <Template name="series">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({
                series,
                scales,
                stacks,
                data,
                scaleExtension,
                colorDomain,
              }) => {
                const currentSeries = findSeriesByName(symbolName, series);
                const coordinates = currentSeries.calculateCoordinates(
                  data,
                  {
                    xScale: scales[ARGUMENT_DOMAIN],
                    yScale: scales[getValueDomainName(currentSeries.axisName)],
                  },
                  currentSeries,
                  stacks,
                  scaleExtension,
                );
                const props = getRenderProps(currentSeries);
                return (
                  <Series
                    colorDomain={colorDomain}
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
