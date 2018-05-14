import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Root extends React.PureComponent {
  render() {
    const { children, className, ...restProps } = this.props;
    return (
      <g className={classNames('dx-c-bs4-crisp-edges', className)} {...restProps}>
        {children}
      </g>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Root.defaultProps = {
  className: undefined,
};
