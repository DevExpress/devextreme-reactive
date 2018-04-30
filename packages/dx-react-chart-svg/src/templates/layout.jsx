import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Root extends React.PureComponent {
  render() {
    const {
      children, width, height, ...restProps
    } = this.props;

    return (
      <svg
        width={width}
        height={height}
        {...restProps}
      >
        {children}
      </svg>);
  }
}

Root.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Root.defaultProps = {
  children: undefined,
};
