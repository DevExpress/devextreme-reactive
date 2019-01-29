import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper,
} from '@devexpress/dx-react-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';

export interface PagingStateProps {
  /** Specifies the current page number. */
  currentPage?: number;
  /** Specifies the initial page in uncontrolled mode. */
  defaultCurrentPage?: number;
  /** Handles current page changes. */
  onCurrentPageChange?: (currentPage: number) => void;
  /** Specifies the page size. Set this property to `0` to show all rows on a page. */
  pageSize?: number;
  /** Specifies the initial page size in uncontrolled mode. */
  defaultPageSize?: number;
  /** Handles page size changes. */
  onPageSizeChange?: (pageSize: number) => void;
}
interface PagingStateState {
  currentPage: number;
  pageSize: number;
}

export class PagingState extends React.PureComponent<PagingStateProps, PagingStateState> {
  setCurrentPage: (payload: any) => void;
  setPageSize: (payload: any) => void;

  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.currentPage || props.defaultCurrentPage,
      pageSize: props.pageSize !== undefined ? props.pageSize : props.defaultPageSize,
    };

    const stateHelper = createStateHelper(
      this,
      {
        currentPage: () => {
          const { onCurrentPageChange } = this.props;
          return onCurrentPageChange;
        },
        pageSize: () => {
          const { onPageSizeChange } = this.props;
          return onPageSizeChange;
        },
      },
    );

    this.setCurrentPage = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentPage', setCurrentPage);
    this.setPageSize = stateHelper.applyFieldReducer
      .bind(stateHelper, 'pageSize', setPageSize);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      currentPage = prevState.currentPage,
      pageSize = prevState.pageSize,
    } = nextProps;

    return {
      currentPage,
      pageSize,
    };
  }

  render() {
    const { pageSize, currentPage } = this.state;

    return (
      <Plugin
        name="PagingState"
      >
        <Getter name="currentPage" value={currentPage} />
        <Getter name="pageSize" value={pageSize} />
        <Action name="setCurrentPage" action={this.setCurrentPage} />
        <Action name="setPageSize" action={this.setPageSize} />
      </Plugin>
    );
  }
}
