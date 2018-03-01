import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';

export class SeriesState extends React.PureComponent {
  render() {
    const { series } = this.props;
    return ((
      <Plugin name="SeriesState">
        <Getter name="series" value={series} />
      </Plugin>));
  }
}

SeriesState.propTypes = {
  series: PropTypes.array.isRequired,
};
