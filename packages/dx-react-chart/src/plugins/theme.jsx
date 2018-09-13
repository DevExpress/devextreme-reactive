import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';

export class Theme extends React.PureComponent {
  render() {
    const { scheme } = this.props;

    const themeComputing = (
      series,
      domain,
      items,
    ) => palette(items(series, domain), scheme);
    return (
      <Plugin name="Theme">
        <Getter name="themeComputing" value={themeComputing} />
      </Plugin>
    );
  }
}

Theme.propTypes = {
  scheme: PropTypes.array,
};

Theme.defaultProps = {
  scheme: ['#2196F3', '#F44336', '#4CAF50', '#FFEB3B', '#E91E63', '#9C27B0'],
};
