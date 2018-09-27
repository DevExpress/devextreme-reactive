import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';

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
        <Getter name="paletteComputing" value={paletteComputing} />
      </Plugin>
    );
  }
}

Palette.propTypes = {
  scheme: PropTypes.array.isRequired,
};
