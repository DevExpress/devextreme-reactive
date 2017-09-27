import React from 'react';
import { Getter, Watcher, PluginContainer } from '@devexpress/dx-react-core';
import { paginate, ensurePageHeaders, pageCount, rowCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

const rowsWithHeadersComputed = ({ gridRows, pageSize }) => ensurePageHeaders(gridRows, pageSize);
const totalCountComputed = ({ gridRows }) => rowCount(gridRows);
const paginatedRowsComputed = ({ gridRows, pageSize, currentPage }) =>
  paginate(gridRows, pageSize, currentPage);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalPaging extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="gridRows" computed={rowsWithHeadersComputed} />
        <Getter name="totalCount" computed={totalCountComputed} />
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
        <Getter name="gridRows" computed={paginatedRowsComputed} />
      </PluginContainer>
    );
  }
}
