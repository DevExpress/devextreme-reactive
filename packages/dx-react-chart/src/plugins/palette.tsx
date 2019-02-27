import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { PaletteProps } from '../types';

class PaletteBase extends React.PureComponent<PaletteProps> {
  render() {
    const { scheme } = this.props;
    return (
      <Plugin name="Palette">
        <Getter name="palette" value={scheme} />
      </Plugin>
    );
  }
}

export const Palette: React.ComponentType<PaletteProps> = PaletteBase;
