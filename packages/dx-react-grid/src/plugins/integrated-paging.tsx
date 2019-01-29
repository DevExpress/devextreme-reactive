import * as React from 'react';
import { Getter, Plugin, Getters, Actions } from '@devexpress/dx-react-core';
import {
  paginatedRows, rowsWithPageHeaders, rowCount, currentPage,
} from '@devexpress/dx-grid-core';

// tslint:disable-next-line:no-empty-interface
export interface IntegratedPagingProps {
}

const pluginDependencies = [
  { name: 'PagingState' },
];

const rowsWithHeadersComputed = (
  { rows, pageSize, getRowLevelKey }: Getters,
) => rowsWithPageHeaders(rows, pageSize, getRowLevelKey);
const totalCountComputed = ({ rows }: Getters) => rowCount(rows);
const paginatedRowsComputed = (
  { rows, pageSize, currentPage: page }: Getters,
) => paginatedRows(rows, pageSize, page);
const currentPageComputed = (
  { currentPage: page, totalCount, pageSize }: Getters, { setCurrentPage }: Actions,
) => currentPage(page, totalCount, pageSize, setCurrentPage);

// eslint-disable-next-line react/prefer-stateless-function
export class IntegratedPaging extends React.PureComponent<IntegratedPagingProps> {
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
