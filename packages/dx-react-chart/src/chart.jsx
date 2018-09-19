import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  TOP, BOTTOM, LEFT, RIGHT,
} from '@devexpress/dx-chart-core';

import { ChartCore } from './plugins/chart-core';
import { AxesLayout } from './plugins/axes-layout';
import { SpaceFillingRects } from './plugins/space-filling-rects';
import { PaneLayout } from './plugins/pane-layout';
import { LayoutManager } from './plugins/layout-manager';
import { ComponentLayout } from './plugins/component-layout';
import { Palette } from './plugins/palette';
import { Root } from './templates/layout';
import { withComponents } from './utils';

class RawChart extends React.PureComponent {
  render() {
    const {
      data,
      width,
      height,
      children,
      rootComponent,
      palette,
      ...restProps
    } = this.props;
    return ((
      <PluginHost>
        <Palette scheme={palette} />
        {children}
        <ChartCore data={data} />
        <LayoutManager
          width={width}
          height={height}
          rootComponent={rootComponent}
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
      </PluginHost>
    ));
  }
}
RawChart.propTypes = {
  data: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};

RawChart.defaultProps = {
  height: 500,
  width: undefined,
  children: null,
};

RawChart.components = {
  rootComponent: 'Root',
};

export const Chart = withComponents({ Root })(RawChart);
