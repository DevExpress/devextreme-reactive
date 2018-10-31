import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DEFAULT, HOVERED, SELECTED } from '@devexpress/dx-chart-core';
import { Pattern } from '../pattern';
import { withStates } from '../../utils/with-states';

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

const getPatternIdUrl = (prefix, id) => {
  const value = `${prefix}-${id}`;
  return [value, `url(#${value})`];
};

export const Bar = withStates({
  [DEFAULT]: props => props,
  [HOVERED]: ({
    color, index, seriesIndex, ...restProps
  }) => {
    const [patternId, patternUrl] = getPatternIdUrl(`series-${seriesIndex}-point-hover`, index);
    return (
      <React.Fragment>
        <RawBar
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
        <RawBar
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
})(RawBar);
