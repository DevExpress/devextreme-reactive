import React from 'react';
import { Getter, Watcher, PluginContainer } from '@devexpress/dx-react-core';
import { paginate, ensurePageHeaders, pageCount, rowCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class LocalPaging extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalPaging"
        dependencies={pluginDependencies}
      >
        <Getter
          name="rows"
          pureComputed={ensurePageHeaders}
          connectArgs={getter => [
            getter('rows'),
            getter('pageSize'),
          ]}
        />
        <Getter
          name="totalCount"
          pureComputed={rowCount}
          connectArgs={getter => [
            getter('rows'),
          ]}
        />
        <Watcher
          watch={getter => [
            getter('totalCount'),
            getter('currentPage'),
            getter('pageSize'),
          ]}
          onChange={(action, totalCount, currentPage, pageSize) => {
            const totalPages = pageCount(totalCount, pageSize);
            if (totalPages - 1 < currentPage) {
              action('setCurrentPage')(Math.max(totalPages - 1, 0));
            }
          }}
        />
        <Getter
          name="rows"
          pureComputed={paginate}
          connectArgs={getter => [
            getter('rows'),
            getter('pageSize'),
            getter('currentPage'),
          ]}
        />
      </PluginContainer>
    );
  }
}
