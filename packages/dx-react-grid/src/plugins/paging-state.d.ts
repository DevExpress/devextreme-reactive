import * as React from 'react';

export interface PagingStateProps {
  /** Specifies the current page number. */
  currentPage: number;
  /** Specifies the initial page in uncontrolled mode. */
  defaultCurrentPage: number;
  /** Handles current page changes. */
  onCurrentPageChange: (currentPage: number) => void;
  /** Specifies the page size. Set this property to `0` to show all rows on a page. */
  pageSize: number;
  /** Specifies the initial page size in uncontrolled mode. */
  defaultPageSize: number;
  /** Handles page size changes. */
  onPageSizeChange: (pageSize: number) => void;
}

export declare const PagingState: React.ComponentType<PagingStateProps>;
