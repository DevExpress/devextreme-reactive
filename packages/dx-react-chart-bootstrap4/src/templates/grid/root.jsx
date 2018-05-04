import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Root extends React.PureComponent {
  render() {
    const {
      x, y, children, className,
    } = this.props;
    return (
      <g
        transform={`translate(${x} ${y})`}
        className={classNames('dx-c-bs4-crisp-edges', className)}
      >
        {children}
      </g>
    );
  }
}

Root.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Root.defaultProps = {
  className: undefined,
};
