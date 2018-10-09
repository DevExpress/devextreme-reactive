import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import {
  getAnimation,
} from '@devexpress/dx-chart-core';

export class Animation extends React.PureComponent {
  render() {
    const { settings } = this.props;
    return (
      <Plugin name="Animation">
        <Getter name="getAnimation" value={getAnimation(settings)} />
      </Plugin>
    );
  }
}

Animation.propTypes = {
  settings: PropTypes.func,
};

Animation.defaultProps = {
  settings: null,
};
