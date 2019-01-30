import * as React from 'react';

/** @internal */
export class RefHolder extends React.PureComponent {
  render() {
    const { children } = this.props;
    return children;
  }
}
