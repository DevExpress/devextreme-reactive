import * as React from 'react';

export interface PagingPanelContainerProps {
  /** Specifies the total page count. */
  totalPages: number;
  /** Specifies the current page. */
  currentPage: number;
  /** Handles the current page changes. */
  onCurrentPageChange: (page: number) => void;
  /** Specifies the page size. */
  pageSize: number;
  /** Handles the page size changes. */
  onPageSizeChange: (size: number) => void;
  /** Specifies the page sizes that a user can select. */
  pageSizes: Array<number>;
  /** Returns the paging panel's text. */
  getMessage: (messageKey: string) => string;
}

export interface PagingPanelProps {
  /** A component that renders the paging panel. */
  containerComponent: React.ComponentType<PagingPanelContainerProps>;
  /** The page sizes that a user can select. */
  pageSizes: Array<number>;
  /** An object that specifies the [localization messages]. */
  messages: object;
}

export declare const PagingPanel: React.ComponentType<PagingPanelProps>;
