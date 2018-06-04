import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Root extends React.PureComponent {
  render() {
    const {
      children, height, width, style, className, ...restProps
    } = this.props;

    return (
      <div
        style={{
          ...style,
          height: `${height}px`,
          ...width ? { width: `${width}px` } : null,
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
  height: PropTypes.number.isRequired,
  width: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};

Root.defaultProps = {
  width: undefined,
  children: undefined,
  style: undefined,
  className: undefined,
};
