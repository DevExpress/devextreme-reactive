import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Root extends React.PureComponent {
  render() {
    const {
      children, width, height, style, ...restProps
    } = this.props;

    return (
      <div
        style={{
          ...style,
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
};

Root.defaultProps = {
  children: undefined,
  style: undefined,
};
