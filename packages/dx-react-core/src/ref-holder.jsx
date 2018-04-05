import * as React from 'react';
import * as PropTypes from 'prop-types';

export class RefHolder extends React.PureComponent {
  render() {
    return this.props.children;
  }
}

RefHolder.propTypes = {
  children: PropTypes.node.isRequired,
};
