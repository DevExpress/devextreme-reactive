import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { ChartCore } from './plugins/chart-core';
import { LayoutManager } from './plugins/layout-manage';

export class Chart extends React.PureComponent {
  render() {
    const {
      data,
      width,
      height,
      children,
      ...restProps
    } = this.props;
    return ((
      <PluginHost>
        <ChartCore
          data={data}
          width={width}
          height={height}
          {...restProps}
        />
        <LayoutManager width={width} height={height} />
        {children}
      </PluginHost>
    ));
  }
}
Chart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node,
};

Chart.defaultProps = {
  width: 150,
  height: 150,
  children: null,
};

