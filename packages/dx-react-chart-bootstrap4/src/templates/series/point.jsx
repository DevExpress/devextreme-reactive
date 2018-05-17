import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Point extends React.PureComponent {
  render() {
    const {
      x, y, seriesComponent, value, ...restProps
    } = this.props;
    return (
      <path
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
};

Point.defaultProps = {
  seriesComponent: null,
};
