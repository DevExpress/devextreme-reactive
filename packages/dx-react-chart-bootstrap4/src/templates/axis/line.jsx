import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Line extends React.PureComponent {
  render() {
    const {
      width, height, orientation, className, ...restProps
    } = this.props;
    return (
      <path
        d={`M 0 0 L ${orientation === 'horizontal' ? width : 0} ${orientation === 'horizontal' ? 0 : height}`}
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
