import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Item extends React.PureComponent {
  render() {
    const {
      children,
    } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
};
