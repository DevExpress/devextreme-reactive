import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { getStackedSeries } from '@devexpress/dx-chart-core';
import {
  stackOrderNone,
  stackOffsetDiverging,
} from 'd3-shape';

export class Stack extends React.PureComponent {
  render() {
    const { offset, order } = this.props;
    const getSeries = ({ series, data }) => getStackedSeries(series, data, offset, order);
    return (
      <Plugin name="Stack">
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}

Stack.propTypes = {
  offset: PropTypes.func,
  order: PropTypes.func,
};

Stack.defaultProps = {
  offset: stackOffsetDiverging,
  order: stackOrderNone,
};
