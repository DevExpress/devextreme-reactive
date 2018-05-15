import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';

export class ChartCore extends React.PureComponent {
  render() {
    const {
      data,
    } = this.props;
    return (
      <Plugin>
        <Getter name="data" value={data} />
      </Plugin>
    );
  }
}

ChartCore.propTypes = {
  data: PropTypes.array.isRequired,
};

