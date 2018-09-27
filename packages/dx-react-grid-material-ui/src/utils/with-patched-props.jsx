import * as React from 'react';

export const withPatchedProps = patchProps => (Target) => {
  class Patched extends React.PureComponent {
    render() {
      return <Target {...patchProps(this.props)} />;
    }
  }
  return Patched;
};
