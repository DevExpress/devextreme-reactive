import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper,
} from '@devexpress/dx-react-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';
import { PagingStateProps, PagingStateState } from '../types';

class PagingStateBase extends React.PureComponent<PagingStateProps, PagingStateState> {
  static defaultProps = {
    defaultPageSize: 10,
    defaultCurrentPage: 0,
  };
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

/***
 * A plugin that manages the paging state. It controls the total page count depending on the
 * total row count and the specified page size, controls the currently selected page number
 * and changes it in response to the corresponding actions.
 * */
export const PagingState: React.ComponentType<PagingStateProps> = PagingStateBase;
