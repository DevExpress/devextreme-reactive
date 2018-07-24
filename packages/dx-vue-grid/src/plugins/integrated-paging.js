import { DxGetter, DxPlugin } from '@devexpress/dx-vue-core';
import {
  paginatedRows, rowsWithPageHeaders, rowCount, currentPage,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxPagingState' },
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

export const DxIntegratedPaging = {
  name: 'DxIntegratedPaging',
  render() {
    return (
      <DxPlugin
        name="DxIntegratedPaging"
        dependencies={pluginDependencies}
      >
        <DxGetter name="rows" computed={rowsWithHeadersComputed} />
        <DxGetter name="totalCount" computed={totalCountComputed} />
        <DxGetter name="currentPage" computed={currentPageComputed} />
        <DxGetter name="rows" computed={paginatedRowsComputed} />
      </DxPlugin>
    );
  },
};
