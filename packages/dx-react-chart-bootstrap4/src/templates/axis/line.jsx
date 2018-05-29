import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Line extends React.PureComponent {
  render() {
    const {
      width, height, orientation, className, ...restProps
    } = this.props;
    return (
      <line
        x1={0}
        x2={orientation === 'horizontal' ? width : 0}
        y1={0}
        y2={orientation === 'horizontal' ? 0 : height}
        className={classNames('dx-c-bs4-stroke-current-color dx-c-bs4-axis-opacity', className)}
        {...restProps}
      />
    );
  }
}

Line.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Line.defaultProps = {
  className: undefined,
};
