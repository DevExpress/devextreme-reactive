import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withSeriesPlugin } from './series-helper';

const makeRawSeries = (d3Func) => {
  class Series extends React.PureComponent {
    render() {
      const {
        seriesComponent: Path,
        ...restProps
      } = this.props;
      return <Path path={d3Func} {...restProps} />;
    }
  }

  Series.propTypes = {
    seriesComponent: PropTypes.func.isRequired,
  };

  return Series;
};

// TODO: Change its signature to `declareSeries(name, options, components)`.
export const makeSeries = (
  pluginName,
  pathType,
  d3Func,
  calculateCoordinates,
  componentsDefinition,
  createHitTester,
) => {
  const RawSeries = makeRawSeries(d3Func);
  const Series = withSeriesPlugin(
    RawSeries, pluginName, pathType, calculateCoordinates, createHitTester,
  );
  Series.components = componentsDefinition;
  return Series;
};
