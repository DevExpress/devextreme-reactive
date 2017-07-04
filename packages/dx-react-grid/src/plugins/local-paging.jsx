import React from 'react';
import { Getter, Watcher, PluginContainer } from '@devexpress/dx-react-core';
import { paginate, ensurePageHeaders, totalPageCount, totalCount } from '@devexpress/dx-grid-core';

// eslint-disable-next-line react/prefer-stateless-function
export class LocalPaging extends React.PureComponent {
  render() {
    return (
      <PluginContainer>
        <Getter
          name="rows"
          pureComputed={ensurePageHeaders}
          connectArgs={getter => [
            getter('rows'),
            getter('pageSize'),
          ]}
        />
        <Getter
          name="totalPages"
          pureComputed={totalPageCount}
          connectArgs={getter => [
            getter('rows'),
            getter('pageSize'),
          ]}
        />
        <Getter
          name="totalCount"
          pureComputed={totalCount}
          connectArgs={getter => [
            getter('rows'),
          ]}
        />
        <Watcher
          watch={getter => [
            getter('totalPages'),
            getter('currentPage'),
          ]}
          onChange={(action, totalPages, currentPage) => {
            if (totalPages - 1 < currentPage) {
              action('setCurrentPage')({ page: Math.max(totalPages - 1, 0) });
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
