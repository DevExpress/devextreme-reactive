import * as React from 'react';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import {
  paginatedRows, rowsWithPageHeaders, rowCount, currentPage,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'PagingState' },
];

const rowsWithHeadersComputed = (
  { rows, pageSize, getRowLevelKey },
) => rowsWithPageHeaders(rows, pageSize, getRowLevelKey);
const totalCountComputed = ({ rows }) => rowCount(rows);
const paginatedRowsComputed = (
  { rows, pageSize, currentPage: page },
) => paginatedRows(rows, pageSize, page);
const currentPageComputed = (
  { currentPage: page, totalCount, pageSize }, { setCurrentPage },
) => currentPage(page, totalCount, pageSize, setCurrentPage);

// eslint-disable-next-line react/prefer-stateless-function
export class IntegratedPaging extends React.PureComponent {
  render() {
    return (
      <Plugin
        name="IntegratedPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsWithHeadersComputed} />
        <Getter name="totalCount" computed={totalCountComputed} />
        <Getter name="currentPage" computed={currentPageComputed} />
        <Getter name="rows" computed={paginatedRowsComputed} />
      </Plugin>
    );
  }
}
