import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
} from '@devexpress/dx-react-core';
import { changeSeriesState, SELECTED } from '@devexpress/dx-chart-core';

export class Selection extends React.PureComponent {
  render() {
    const { selection } = this.props;
    const getSeries = ({ series }) => changeSeriesState(series, selection, SELECTED);
    return (
      <Plugin name="Selection">
        <Getter name="series" computed={getSeries} />
      </Plugin>
    );
  }
}

Selection.propTypes = {
  selection: PropTypes.arrayOf(PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number,
  })),
};

Selection.defaultProps = {
  selection: [],
};
