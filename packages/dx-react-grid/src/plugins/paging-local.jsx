import React from 'react';
import { Getter, Watcher, PluginContainer } from '@devexpress/dx-react-core';
import { paginate, ensurePageHeaders, totalPageCount } from '@devexpress/dx-grid-core';

export const LocalPaging = () => (
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
    <Watcher
      watch={getter => [
        getter('totalPages'),
        getter('currentPage'),
      ]}
      onChange={(action, totalPages1, currentPage) => {
        if (totalPages1 - 1 < currentPage) {
          action('setCurrentPage')({ page: Math.max(totalPages1 - 1, 0) });
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
