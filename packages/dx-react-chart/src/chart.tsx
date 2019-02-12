import * as React from 'react';
import { PluginHost, withComponents, PluginComponents } from '@devexpress/dx-react-core';
import {
  TOP, BOTTOM, LEFT, RIGHT,
} from '@devexpress/dx-chart-core';
import { RawChartProps } from './types';

import { BasicData } from './plugins/basic-data';
import { ChartCore } from './plugins/chart-core';
import { AxesLayout } from './plugins/axes-layout';
import { SpaceFillingRects } from './plugins/space-filling-rects';
import { PaneLayout } from './plugins/pane-layout';
import { LayoutManager } from './plugins/layout-manager';
import { ComponentLayout } from './plugins/component-layout';
import { Palette } from './plugins/palette';
import { Root } from './templates/layout';
import { Label } from './templates/label';

const defaultProps = {
  height: 500,
};

type RawChartDefaultProps = Readonly<typeof defaultProps>;

class RawChart extends React.PureComponent<RawChartProps & RawChartDefaultProps> {
  static defaultProps = defaultProps;
  static components: PluginComponents;
  render() {
    const {
      data,
      width,
      height,
      children,
      rootComponent,
      ...restProps
    } = this.props;
    return ((
      <PluginHost>
        <BasicData data={data} />
        <Palette scheme={[]} />
        <LayoutManager
          width={width}
          height={height}
          rootComponent={rootComponent}
          {...restProps}
        />
        <PaneLayout />
        <AxesLayout />
        <ComponentLayout />
        <SpaceFillingRects
          placeholders={[
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
        <ChartCore />

      </PluginHost>
    ));
  }
}

RawChart.components = {
  rootComponent: 'Root',
};

export const Chart: React.ComponentType<RawChartProps> = withComponents({ Root })(RawChart);
Chart.Label = Label;
