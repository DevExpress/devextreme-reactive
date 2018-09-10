import React from 'react';

export const patchProps = (Target, patch) => {
  class Component extends React.PureComponent {
    render() {
      const props = patch(this.props);
      return <Target {...props} />;
    }
  }
  return Component;
};
