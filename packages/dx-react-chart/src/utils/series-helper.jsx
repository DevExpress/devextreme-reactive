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
  findSeriesByName, xyScales, seriesData, ARGUMENT_DOMAIN, getValueDomainName,
} from '@devexpress/dx-chart-core';

// TODO: Remove it - just pass `true` or `false` to `withSeriesPlugin`.
const isStartedFromZero = pathType => pathType === 'area' || pathType === 'bar';

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
                domains,
                stacks,
                data,
                layouts,
                scaleExtension,
                colorDomain,
              }) => {
                const {
                  name, axisName, argumentField, valueField, groupWidth, stack,
                  // The following props are enumerated here only to prevent them
                  // from being passed to Series.
                  symbolName: _symbolName,
                  isStartedFromZero: _isStartedFromZero,
                  ...restProps
                } = findSeriesByName(symbolName, series);

                const scales = xyScales(
                  domains[ARGUMENT_DOMAIN],
                  domains[getValueDomainName(axisName)],
                  layouts.pane,
                  groupWidth,
                  scaleExtension,
                );
                const calculatedCoordinates = calculateCoordinates(
                  data,
                  scales,
                  argumentField,
                  valueField,
                  name,
                  stack,
                  stacks,
                  restProps,
                  scaleExtension,
                );

                return (
                  <Series
                    colorDomain={colorDomain}
                    coordinates={calculatedCoordinates}
                    {...restProps}
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
    valueField: PropTypes.string.isRequired,
    argumentField: PropTypes.string.isRequired,
    axisName: PropTypes.string,
    stack: PropTypes.string,
    color: PropTypes.string,
    groupWidth: PropTypes.number,
  };
  Component.defaultProps = {
    name: 'defaultSeriesName',
    color: undefined,
    axisName: undefined,
    stack: undefined,
    groupWidth: 0.7,
  };
  return Component;
};
