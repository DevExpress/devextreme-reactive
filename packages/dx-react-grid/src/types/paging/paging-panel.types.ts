// tslint:disable-next-line: no-namespace
export namespace PagingPanel {
  /** Describes the container component properties. */
  export interface ContainerProps {
    /** Specifies the total page count. */
    totalPages: number;
    /** Specifies the current page. */
    currentPage: number;
    /** Handles the current page changes. */
    onCurrentPageChange: (page: number) => void;
    /** Specifies the page size. */
    pageSize: number;
    /** Specifies the total row count. */
    totalCount: number;
    /** Handles the page size changes. */
    onPageSizeChange: (size: number) => void;
    /** Specifies the page sizes that a user can select. */
    pageSizes: Array<number>;
    /** Returns the paging panel's text. */
    getMessage: (
      messageKey: string, parameters?: { from: number, to: number, count: number },
    ) => string;
  }

  export interface LocalizationMessages {
    /** Specifies the page size selector's 'All' item text. */
    showAll?: string;
    /*** Specifies the 'Rows per page' label's text.
     * Available in the "\@devexpress/dx-react-grid-material-ui" package. */
    rowsPerPage?: string;
    /** Specifies the 'Row count' text template. */
    info?: (parameters: { from: number, to: number, count: number }) => string | string;
  }
}

export interface PagingPanelProps {
  /** A component that renders the paging panel. */
  containerComponent: React.ComponentType<PagingPanel.ContainerProps>;
  /** The page sizes that a user can select. */
  pageSizes?: Array<number>;
  /** An object that specifies the localization messages. */
  messages?: PagingPanel.LocalizationMessages;
}
