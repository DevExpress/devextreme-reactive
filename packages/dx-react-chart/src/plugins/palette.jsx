import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';

// TODO: Remove "palette" getter from BasicData and add Palette to Chart
// when "paletteComputing" is removed.
export class Palette extends React.PureComponent {
  render() {
    const { scheme } = this.props;

    const paletteComputing = (
      series,
      domain,
      items,
    ) => palette(items(series, domain), scheme);
    return (
      <Plugin name="Palette">
        <Getter name="palette" value={scheme} />
        <Getter name="paletteComputing" value={paletteComputing} />
      </Plugin>
    );
  }
}

Palette.propTypes = {
  scheme: PropTypes.array.isRequired,
};
