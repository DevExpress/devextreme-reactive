import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Point extends React.PureComponent {
  render() {
    const {
      x, y, seriesComponent, value, themeColor, ...restProps
    } = this.props;
    return (
      <path
        fill={themeColor}
        transform={`translate(${x} ${y})`}
        {...restProps}
      />
    );
  }
}

Point.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  seriesComponent: PropTypes.any,
  value: PropTypes.number.isRequired,
  themeColor: PropTypes.string,
};

Point.defaultProps = {
  seriesComponent: null,
  themeColor: undefined,
};
