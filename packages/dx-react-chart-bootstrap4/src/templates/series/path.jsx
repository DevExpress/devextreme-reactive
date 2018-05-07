import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Path extends React.PureComponent {
  render() {
    const {
      x, y, className, ...restProps
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        className={classNames('dx-c-bs4-fill-none', className)}
        {...restProps}
      />
    );
  }
}

Path.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
};

Path.defaultProps = {
  className: undefined,
};
