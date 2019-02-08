import * as React from 'react';
import { Palette as Scheme } from '@devexpress/dx-chart-core';
import { Plugin, Getter } from '@devexpress/dx-react-core';

type PaletteProps = {
  scheme: Scheme,
};
export class Palette extends React.PureComponent<PaletteProps> {
  render() {
    const { scheme } = this.props;
    return (
      <Plugin name="Palette">
        <Getter name="palette" value={scheme} />
      </Plugin>
    );
  }
}
