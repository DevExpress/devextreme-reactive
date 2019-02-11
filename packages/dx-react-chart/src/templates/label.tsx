import * as React from 'react';

type LabelProps = {
  children: string | number,
  x: number,
  y: number,
};

export class Label extends React.PureComponent<LabelProps & any> {
  render() {
    return (
      <text {...this.props} />
    );
  }
}
