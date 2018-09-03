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
import { ThemeManager } from './plugins/theme-manager';

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
        {children}
        <ChartCore data={data} />
        <ThemeManager />
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
  height: 500,
  width: undefined,
  children: null,
};
