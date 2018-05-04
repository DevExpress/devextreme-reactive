import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Root extends React.PureComponent {
  render() {
    const {
      children,
    } = this.props;
    return (
      <ul className="list-group ml-4 my-auto" >
        {children}
      </ul>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};
