import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { ChartCore } from './plugins/chart-core';
import { LayoutManager } from './plugins/layout-manager';
import { IntegratedScaleProcessing } from './plugins/integrated-scale-processing';
import { SeriesFamily } from './plugins/series-family';

export class Chart extends React.PureComponent {
  render() {
    const {
      data,
      width,
      height,
      children,
      rootComponent: Root,
      ...restProps
    } = this.props;
    return ((
      <PluginHost>
        <ChartCore
          data={data}
          width={width}
          height={height}
          rootComponent={Root}
          {...restProps}
        />
        <SeriesFamily />
        <LayoutManager
          width={width}
          height={height}
        />
        <IntegratedScaleProcessing />
        {children}
      </PluginHost>
    ));
  }
}
Chart.propTypes = {
  data: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};

Chart.defaultProps = {
  width: 150,
  height: 150,
  children: null,
};

