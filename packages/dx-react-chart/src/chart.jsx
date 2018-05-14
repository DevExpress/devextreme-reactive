import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { TOP, BOTTOM, LEFT, RIGHT } from '@devexpress/dx-chart-core';

import { ChartCore } from './plugins/chart-core';
import { AxesLayout } from './plugins/axes-layout';
import { SpaceFillingRects } from './plugins/space-filling-rects';
import { PaneLayout } from './plugins/pane-layout';
import { LayoutManager } from './plugins/layout-manager';
import { ComponentLayout } from './plugins/component-layout';
import { IntegratedScaleProcessing } from './plugins/integrated-scale-processing';
import { SeriesFamily } from './plugins/series-family';

export class Chart extends React.PureComponent {
  render() {
    const {
      data,
      axes,
      width,
      height,
      series,
      children,
      rootComponent: Root,
      ...restProps
    } = this.props;
    return ((
      <PluginHost>
        <ChartCore
          data={data}
          axes={axes}
          series={series}
        />
        <SeriesFamily />
        <IntegratedScaleProcessing />
        <LayoutManager
          width={width}
          height={height}
          rootComponent={Root}
          {...restProps}
        />
        <PaneLayout />
        <AxesLayout />
        <ComponentLayout />
        <SpaceFillingRects placeholders={[
          `${TOP}-${LEFT}`,
          `${TOP}-${RIGHT}`,
          `${BOTTOM}-${LEFT}`,
          `${BOTTOM}-${RIGHT}`,
          `${TOP}-${LEFT}-axis`,
          `${TOP}-${RIGHT}-axis`,
          `${BOTTOM}-${LEFT}-axis`,
          `${BOTTOM}-${RIGHT}-axis`,
          ]}
        />
        {children}
      </PluginHost>
    ));
  }
}
Chart.propTypes = {
  data: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  axes: PropTypes.array,
  series: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};

Chart.defaultProps = {
  width: 150,
  height: 150,
  children: null,
  axes: [],
};

