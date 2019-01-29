import * as React from 'react';
import { Getter, Plugin } from '@devexpress/dx-react-core';

export interface CustomPagingProps {
  /** The total row count. */
  totalCount?: number;
}

const pluginDependencies = [
  { name: 'PagingState' },
];

export class CustomPaging extends React.PureComponent<CustomPagingProps> {
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
