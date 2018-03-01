import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';

export class AxesState extends React.PureComponent {
  render() {
    const { axes } = this.props;
    const argumentAxisName = axes.find(axis => axis.orientation === 'horizontal').name;

    return ((
      <Plugin name="AxesState">
        <Getter name="axes" value={axes} />
        <Getter name="argumentAxisName" value={argumentAxisName} />
      </Plugin>));
  }
}

AxesState.propTypes = {
  axes: PropTypes.array.isRequired,
};
