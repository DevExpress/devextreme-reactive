import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';


export class Root extends React.PureComponent {
  render() {
    const {
      x, y, refsHandler, children, className, ...restProps
    } = this.props;
    return (
      <g
        ref={refsHandler}
        transform={`translate(${x} ${y})`}
        className={classNames('dx-c-bs4-crisp-edges', className)}
        {...restProps}
      >
        {children}
      </g>
    );
  }
}

Root.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  refsHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Root.defaultProps = {
  className: undefined,
};
