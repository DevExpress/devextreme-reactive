import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DEFAULT, HOVERED, SELECTED } from '@devexpress/dx-chart-core';
import { Pattern } from '../pattern';
import { withStates } from '../../utils/with-states';

class RawSlice extends React.PureComponent {
  render() {
    const {
      argument, value, index, seriesIndex, innerRadius, outerRadius, startAngle, endAngle,
      x, y, d, color, ...restProps
    } = this.props;
    return (
      <path
        fill={color}
        stroke="none"
        d={d}
        {...restProps}
      />
    );
  }
}

RawSlice.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
};

RawSlice.defaultProps = {
  style: {},
  color: undefined,
};

const getPatternIdUrl = (prefix, id) => {
  const value = `${prefix}-${id}`;
  return [value, `url(#${value})`];
};

export const Slice = withStates({
  [DEFAULT]: props => props,
  [HOVERED]: ({
    color, index, seriesIndex, ...restProps
  }) => {
    const [patternId, patternUrl] = getPatternIdUrl(`series-${seriesIndex}-point-hover`, index);
    return (
      <React.Fragment>
        <RawSlice
          fill={patternUrl}
          {...restProps}
        />
        <Pattern
          id={patternId}
          color={color}
          opacity={0.75}
        />
      </React.Fragment>
    );
  },
  [SELECTED]: ({
    color, index, seriesIndex, ...restProps
  }) => {
    const [patternId, patternUrl] = getPatternIdUrl(`series-${seriesIndex}-point-selection`, index);
    return (
      <React.Fragment>
        <RawSlice
          fill={patternUrl}
          {...restProps}
        />
        <Pattern
          id={patternId}
          color={color}
          opacity={0.85}
        />
      </React.Fragment>
    );
  },
})(RawSlice);
