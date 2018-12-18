import * as React from 'react';

export class RefHolder extends React.PureComponent {
  render() {
    const { children } = this.props;
    return children;
  }
}
