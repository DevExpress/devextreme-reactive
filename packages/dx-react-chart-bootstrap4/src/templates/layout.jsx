import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Root extends React.PureComponent {
  render() {
    const {
      children, width, height, style, className, ...restProps
    } = this.props;

    return (
      <div
        style={{
          ...style,
          width: `${width}px`,
          height: `${height}px`,
        }}
        className={classNames('dx-c-bs4-container', className)}
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
  className: PropTypes.string,
};

Root.defaultProps = {
  children: undefined,
  style: undefined,
  className: undefined,
};
