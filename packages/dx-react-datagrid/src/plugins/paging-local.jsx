import React from 'react';
import { Getter } from '@devexpress/dx-react-core';
import { paginate, ensurePageHeaders } from '@devexpress/dx-datagrid-core';

export const LocalPaging = () => (
  <div>
    <Getter
      name="rows"
      pureComputed={ensurePageHeaders}
      connectArgs={getter => [
        getter('rows'),
        getter('pageSize'),
      ]}
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
  </div>
);
