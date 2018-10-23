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
    points,
    getPointTransformer,
    createHitTester,
    ...restProps
  } = series;

  return restProps;
};

export const withSeriesPlugin = (
  Series,
  pluginName,
  pathType, // TODO: Replace it with bool - `isStartedFromZero`.
  getPointTransformer,
  // Hit tester belongs to Tracker plugin and should not be part of basic code.
  // TODO: Is there a way to remove it from here?
  createHitTester,
) => {
  class Component extends React.PureComponent {
    render() {
      const { name } = this.props;
      const symbolName = Symbol(name);
      const seriesItem = {
        ...this.props,
        getPointTransformer,
        createHitTester,
        isStartedFromZero: isStartedFromZero(pathType),
        symbolName,
      };
      const getSeries = ({ series, data, palette }) => addSeries(series, data, palette, seriesItem);
      return (
        <Plugin name={pluginName}>
          <Getter name="series" computed={getSeries} />
          <Template name="series">
            <TemplatePlaceholder />
            <TemplateConnector>
              {({ series }) => {
                const currentSeries = findSeriesByName(symbolName, series);
                const props = getRenderProps(currentSeries);
                return <Series coordinates={currentSeries.points} {...props} />;
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
