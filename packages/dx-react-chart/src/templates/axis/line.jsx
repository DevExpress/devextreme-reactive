import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Line extends React.PureComponent {
  render() {
    const { width, height, ...restProps } = this.props;
    return (
      <path
        d={`M 0 0 L ${width} ${height}`}
        {...restProps}
      />
    );
  }
}

Line.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
