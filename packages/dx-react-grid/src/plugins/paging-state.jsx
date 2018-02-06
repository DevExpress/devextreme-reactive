import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class PagingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.defaultCurrentPage,
      pageSize: props.defaultPageSize,
    };

    const stateHelper = createStateHelper(this);

    this.setCurrentPage = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentPage', setCurrentPage);
    this.setPageSize = stateHelper.applyFieldReducer
      .bind(stateHelper, 'pageSize', setPageSize);
  }
  getState() {
    const {
      currentPage = this.state.currentPage,
      pageSize = this.state.pageSize,
    } = this.props;
    return {
      ...this.state,
      currentPage,
      pageSize,
    };
  }
  notifyStateChange(nextState, state) {
    const { currentPage } = nextState;
    const { onCurrentPageChange } = this.props;
    if (onCurrentPageChange && currentPage !== state.currentPage) {
      onCurrentPageChange(currentPage);
    }

    const { pageSize } = nextState;
    const { onPageSizeChange } = this.props;
    if (onPageSizeChange && pageSize !== state.pageSize) {
      onPageSizeChange(pageSize);
    }
  }
  render() {
    const { pageSize, currentPage } = this.getState();

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

PagingState.propTypes = {
  pageSize: PropTypes.number,
  defaultPageSize: PropTypes.number,
  onPageSizeChange: PropTypes.func,
  currentPage: PropTypes.number,
  defaultCurrentPage: PropTypes.number,
  onCurrentPageChange: PropTypes.func,
};

PagingState.defaultProps = {
  pageSize: undefined,
  defaultPageSize: 10,
  onPageSizeChange: undefined,
  currentPage: undefined,
  defaultCurrentPage: 0,
  onCurrentPageChange: undefined,
};
