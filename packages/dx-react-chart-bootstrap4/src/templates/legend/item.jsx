import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Item extends React.PureComponent {
  render() {
    const {
      children, className, ...restProps
    } = this.props;
    return (
      <li className={classNames('list-group-item', className)} {...restProps}>
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
