import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { paginatedRows, rowsWithPageHeaders, pageCount, rowCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

const rowsWithHeadersComputed = ({ rows, pageSize, getRowLevelKey }) =>
  rowsWithPageHeaders(rows, pageSize, getRowLevelKey);
const totalCountComputed = ({ rows }) => rowCount(rows);
const paginatedRowsComputed = ({ rows, pageSize, currentPage }) =>
  paginatedRows(rows, pageSize, currentPage);
const gettersChangesComputed = (returnedValue, getters, actions) => {
  const totalPages = pageCount(getters.totalCount, getters.pageSize);
  if (totalPages - 1 < getters.currentPage) {
    actions.setCurrentPage(Math.max(totalPages - 1, 0));
  }
  return returnedValue;
};

// eslint-disable-next-line react/prefer-stateless-function
export class LocalPaging extends React.PureComponent {
  render() {
    return (
      <PluginContainer
        pluginName="LocalPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsWithHeadersComputed} />
        <Getter name="totalCount" computed={totalCountComputed} />
        <Getter
          name="currentPage"
          computed={(getters, actions) =>
            gettersChangesComputed(getters.currentPage, getters, actions)
          }
        />
        <Getter
          name="totalCount"
          computed={(getters, actions) =>
            gettersChangesComputed(getters.totalCount, getters, actions)
          }
        />
        <Getter
          name="pageSize"
          computed={(getters, actions) =>
            gettersChangesComputed(getters.pageSize, getters, actions)
          }
        />
        <Getter name="rows" computed={paginatedRowsComputed} />
      </PluginContainer>
    );
  }
}
