import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Point extends React.PureComponent {
  render() {
    const {
      x, y, pathComponent, value, ...restProps
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
  value: PropTypes.number.isRequired,
  pathComponent: PropTypes.any,
  style: PropTypes.object,
};

Point.defaultProps = {
  style: null,
  pathComponent: null,
};
