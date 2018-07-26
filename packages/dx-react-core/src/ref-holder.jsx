import * as React from 'react';
import * as PropTypes from 'prop-types';

export class RefHolder extends React.PureComponent {
  render() {
    const { children } = this.props;
    return children;
  }
}

RefHolder.propTypes = {
  children: PropTypes.node.isRequired,
};
