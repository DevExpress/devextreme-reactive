import * as React from 'react';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { CustomPagingProps } from '../types';

const pluginDependencies = [
  { name: 'PagingState' },
];

class CustomPagingBase extends React.PureComponent<CustomPagingProps> {
  render() {
    const { totalCount } = this.props;

    return (
      <Plugin
        name="CustomPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="totalCount" value={totalCount} />
      </Plugin>
    );
  }
}

export const CustomPaging: React.ComponentType<CustomPagingProps> = CustomPagingBase;
