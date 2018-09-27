import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Line extends React.PureComponent {
  render() {
    const {
      width, height, orientation, ...restProps
    } = this.props;
    return (
      <path
        d={`M 0 0 L ${orientation === 'horizontal' ? width : 0} ${orientation === 'horizontal' ? 0 : height}`}
        {...restProps}
      />
    );
  }
}

Line.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
};
