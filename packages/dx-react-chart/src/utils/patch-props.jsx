import * as React from 'react';

export const withPatchedProps = patch => (Target) => {
  class Component extends React.PureComponent {
    render() {
      const props = patch(this.props);
      return <Target {...props} />;
    }
  }
  return Component;
};
