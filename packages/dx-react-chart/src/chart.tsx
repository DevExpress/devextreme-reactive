import * as React from 'react';
import { PluginHost, withComponents, PluginComponents } from '@devexpress/dx-react-core';
import {
  TOP, BOTTOM, LEFT, RIGHT,
} from '@devexpress/dx-chart-core';
import { ChartProps } from './types';

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
import { ClipPath } from './plugins/clip-path';

const clipPathId = `clip_path_${Math.round(Math.random() * 100)}`;

class RawChart extends React.PureComponent<ChartProps> {
  static defaultProps: Partial<ChartProps> = {
    height: 500,
  };
  static components: PluginComponents = {
    rootComponent: 'Root',
  };

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
          height={height!}
          rootComponent={rootComponent}
          {...restProps}
        />
        <PaneLayout id={clipPathId} />
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
        <ClipPath id={clipPathId} />
        {children}
        <ChartCore />

      </PluginHost>
    ));
  }
}

export const Chart: React.ComponentType<ChartProps> = withComponents({ Root })(RawChart);
(Chart as any).Label = Label;
