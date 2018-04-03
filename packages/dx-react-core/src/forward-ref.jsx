import * as React from 'react';
import * as PropTypes from 'prop-types';

export class ForwardRef extends React.PureComponent {
  render() {
    return this.props.children;
  }
}

ForwardRef.propTypes = {
  children: PropTypes.node.isRequired,
};
