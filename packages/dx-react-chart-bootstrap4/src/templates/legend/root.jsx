import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Root extends React.PureComponent {
  render() {
    const {
      children, className, ...restProps
    } = this.props;
    return (
      <ul className={classNames('list-group ml-4 my-auto', className)} {...restProps}>
        {children}
      </ul>
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
