import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Path extends React.PureComponent {
  render() {
    const {
      className, coordinates, path, color, ...restProps
    } = this.props;
    return (
      <path
        stroke={color}
        className={classNames('dx-c-bs4-fill-none dx-c-bs4-series-path', className)}
        d={path(coordinates)}
        {...restProps}
      />
    );
  }
}

Path.propTypes = {
  className: PropTypes.string,
  coordinates: PropTypes.array.isRequired,
  path: PropTypes.func.isRequired,
  color: PropTypes.string,
};

Path.defaultProps = {
  className: undefined,
  color: undefined,
};
