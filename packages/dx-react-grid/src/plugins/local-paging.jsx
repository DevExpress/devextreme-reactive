import React from 'react';
import { Property, Watcher, PluginContainer } from '@devexpress/dx-react-core';
import { paginate, ensurePageHeaders, pageCount, rowCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

const rowsWithHeadersComputed = ({ rows, pageSize }) => ensurePageHeaders(rows, pageSize);
const totalCountComputed = ({ rows }) => rowCount(rows);
const paginatedRowsComputed = ({ rows, pageSize, currentPage }) =>
  paginate(rows, pageSize, currentPage);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalPaging extends React.PureComponent {
  render() {
    return (

      <PluginContainer
        pluginName="LocalPaging"
        dependencies={pluginDependencies}
      >
        <Property name="rows" computed={rowsWithHeadersComputed} />
        <Property name="totalCount" computed={totalCountComputed} />
        <Watcher
          watch={property => [
            property('totalCount'),
            property('currentPage'),
            property('pageSize'),
          ]}
          onChange={(action, totalCount, currentPage, pageSize) => {
            const totalPages = pageCount(totalCount, pageSize);
            if (totalPages - 1 < currentPage) {
              action('setCurrentPage')(Math.max(totalPages - 1, 0));
            }
          }}
        />
        <Property name="rows" computed={paginatedRowsComputed} />
      </PluginContainer>
    );
  }
}
