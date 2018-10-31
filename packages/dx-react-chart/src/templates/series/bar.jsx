import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DEFAULT, HOVERED, SELECTED } from '@devexpress/dx-chart-core';
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
  [DEFAULT]: props => props,
  [HOVERED]: withPattern(
    RawBar,
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-hover`,
    { opacity: 0.75 },
  ),
  [SELECTED]: withPattern(
    RawBar,
    ({ seriesIndex, index }) => `series-${seriesIndex}-point-${index}-selection`,
    { opacity: 0.85 },
  ),
})(RawBar);
