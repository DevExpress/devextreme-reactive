import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Item extends React.PureComponent {
  render() {
    const {
      children, className, ...restProps
    } = this.props;
    return (
      <li className={classNames('d-flex list-group-item border-0 py-1 px-4 row align-items-center', className)} {...restProps}>
        {children}
      </li>
    );
  }
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Item.defaultProps = {
  className: undefined,
};
