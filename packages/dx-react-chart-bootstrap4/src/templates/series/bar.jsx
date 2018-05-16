import * as React from 'react';

export class Bar extends React.PureComponent {
  render() {
    return (
      <rect {...this.props} />
    );
  }
}
