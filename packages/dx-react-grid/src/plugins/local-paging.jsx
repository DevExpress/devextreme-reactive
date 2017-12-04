import React from 'react';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { paginatedRows, rowsWithPageHeaders, pageCount, rowCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

const rowsWithHeadersComputed = ({ rows, pageSize, getRowLevelKey }) =>
  rowsWithPageHeaders(rows, pageSize, getRowLevelKey);
const paginatedRowsComputed = ({ rows, pageSize, currentPage }) =>
  paginatedRows(rows, pageSize, currentPage);

// eslint-disable-next-line react/prefer-stateless-function
export class LocalPaging extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      totalCount: undefined,
      pageSize: undefined,
    };

    this.totalCountComputed = this.totalCountComputed.bind(this);
    this.pageSizeComputed = this.pageSizeComputed.bind(this);
  }

  totalCountComputed({ rows }) {
    const totalCount = rowCount(rows);
    this.setState({ totalCount });
    return totalCount;
  }
  pageSizeComputed({ pageSize }) {
    this.setState({ pageSize });
    return pageSize;
  }
  render() {
    const { totalCount, pageSize } = this.state;

    const currentPageComputed = ({ currentPage }, { setCurrentPage }) => {
      const totalPages = pageCount(totalCount, pageSize);
      if (totalPages - 1 < currentPage) {
        setCurrentPage(Math.max(totalPages - 1, 0));
      }
      return currentPage;
    };

    return (
      <PluginContainer
        pluginName="LocalPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsWithHeadersComputed} />
        <Getter name="totalCount" computed={this.totalCountComputed} />
        <Getter name="pageSize" computed={this.pageSizeComputed} />
        <Getter name="currentPage" computed={currentPageComputed} />
        <Getter name="rows" computed={paginatedRowsComputed} />
      </PluginContainer>
    );
  }
}
