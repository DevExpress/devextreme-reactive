import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HOVERED, SELECTED } from '@devexpress/dx-chart-core';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';

class RawBar extends React.PureComponent {
  render() {
    const {
      argument, value, index, seriesIndex, barWidth, color, ...restProps
    } = this.props;
    return (
      <rect fill={color} {...restProps} />
    );
  }
}

RawBar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

RawBar.defaultProps = {
  color: undefined,
};

export const Bar = withStates({
  [HOVERED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`, { opacity: 0.75 },
  )(RawBar),
  [SELECTED]: withPattern(
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`, { opacity: 0.5 },
  )(RawBar),
})(RawBar);
