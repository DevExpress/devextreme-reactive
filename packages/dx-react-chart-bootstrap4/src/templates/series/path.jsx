import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Path extends React.PureComponent {
  render() {
    const {
      x, y, d, style, className,
    } = this.props;
    return (
      <path
        transform={`translate(${x} ${y})`}
        d={d}
        style={style}
        className={classNames('dx-c-bs4-fill-none', className)}
      />
    );
  }
}

Path.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  d: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Path.defaultProps = {
  className: undefined,
  style: null,
};
