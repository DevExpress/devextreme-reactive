import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';
import { changeSeriesState, SELECTED } from '@devexpress/dx-chart-core';

export class SelectionState extends React.PureComponent {
  render() {
    const { selection } = this.props;
    const getSeries = ({ series }) => changeSeriesState(series, selection, SELECTED);
    return (
      <Plugin name="SelectionState">
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}

SelectionState.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number,
  })),
};

SelectionState.defaultProps = {
  selection: [],
};
