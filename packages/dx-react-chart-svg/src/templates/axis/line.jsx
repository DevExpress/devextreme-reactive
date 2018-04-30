import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Line extends React.PureComponent {
  render() {
    const {
      width, height, orientation,
    } = this.props;
    return (
      <line
        style={{ stroke: 'lightgray', strokeWidth: '1px' }}
        x1={0}
        x2={orientation === 'horizontal' ? width : 0}
        y1={0}
        y2={orientation === 'horizontal' ? 0 : height}
      />
    );
  }
}

Line.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
};
