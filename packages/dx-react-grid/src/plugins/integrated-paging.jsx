import React from 'react';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { paginatedRows, rowsWithPageHeaders, pageCount, rowCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'PagingState' },
];

const clamp = (value, max) => Math.max(Math.min(value, max), 0);

const rowsWithHeadersComputed = ({ rows, pageSize, getRowLevelKey }) =>
  rowsWithPageHeaders(rows, pageSize, getRowLevelKey);
const totalCountComputed = ({ rows }) => rowCount(rows);
const paginatedRowsComputed = ({ rows, pageSize, currentPage }) =>
  paginatedRows(rows, pageSize, currentPage);
const currentPageComputed = ({ currentPage, totalCount, pageSize }, { setCurrentPage }) => {
  const totalPages = pageCount(totalCount, pageSize);
  const adjustedCurrentPage = clamp(currentPage, totalPages - 1);
  if (currentPage !== adjustedCurrentPage) {
    setTimeout(() => setCurrentPage(adjustedCurrentPage));
  }
  return adjustedCurrentPage;
};

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
