import * as React from 'react';
import * as PropTypes from 'prop-types';
import List from '@material-ui/core/List';

export class Root extends React.PureComponent {
  render() {
    const {
      children,
      ...restProps
    } = this.props;
    return (
      <List {...restProps} >
        {children}
      </List>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};
