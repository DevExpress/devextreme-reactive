import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';

// TODO: Remove "palette" getter from BasicData and add Palette to Chart
// when "paletteComputing" is removed.
export class Palette extends React.PureComponent {
  render() {
    const { scheme } = this.props;
    return (
      <Plugin name="Palette">
        <Getter name="palette" value={scheme} />
      </Plugin>
    );
  }
}

Palette.propTypes = {
  scheme: PropTypes.array.isRequired,
};
