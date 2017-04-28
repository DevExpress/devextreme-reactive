import React from 'react';
import { Getter, Watcher, PluginContainer } from '@devexpress/dx-react-core';
import { paginate, ensurePageHeaders } from '@devexpress/dx-datagrid-core';

export class LocalPaging extends React.PureComponent {
  constructor(props) {
    super(props);

    this._totalPages = (rows, pageSize) => Math.ceil(rows.length / pageSize);
  }
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
          pureComputed={this._totalPages}
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
