import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Point extends React.PureComponent {
  render() {
    const {
      x, y, seriesComponent, ...restProps
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
  seriesComponent: PropTypes.any,
};

Point.defaultProps = {
  seriesComponent: null,
};
