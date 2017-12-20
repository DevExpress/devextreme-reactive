import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui';

export class ContainerComponent extends React.PureComponent {
  render() {
    const { children, ...restProps } = this.props;
    return (
      <List
        dense
        {...restProps}
      >
        {children}
      </List>
    );
  }
}

ContainerComponent.propTypes = {
  children: PropTypes.array.isRequired,
};
