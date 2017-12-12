import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';

export class PagingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.defaultCurrentPage,
      pageSize: props.defaultPageSize,
    };

    this.setCurrentPage = (payload) => {
      this.applyReducer(state => ({
        currentPage: setCurrentPage(state.currentPage, payload),
      }));
    };
    this.setPageSize = (payload) => {
      this.applyReducer(state => ({
        pageSize: setPageSize(state.pageSize, payload),
      }));
    };
  }
  getState(temporaryState) {
    return {
      ...this.state,
      currentPage: this.props.currentPage || this.state.currentPage,
      pageSize: this.props.pageSize || this.state.pageSize,
      totalCount: this.props.totalCount,
      ...(this.state !== temporaryState ? temporaryState : null),
    };
  }
  applyReducer(reduce, payload) {
    const stateUpdater = (prevState) => {
      const state = this.getState(prevState);
      const nextState = { ...state, ...reduce(state, payload) };

      if (stateUpdater === this.lastStateUpdater) {
        this.notifyStateChange(nextState, state);
      }

      return nextState;
    };
    this.lastStateUpdater = stateUpdater;

    this.setState(stateUpdater);
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
    const { pageSize, currentPage, totalCount } = this.getState();

    return (
      <PluginContainer
        pluginName="PagingState"
      >
        <Getter name="currentPage" value={currentPage} />
        <Getter name="pageSize" value={pageSize} />
        <Getter name="totalCount" value={totalCount} />
        <Action name="setCurrentPage" action={this.setCurrentPage} />
        <Action name="setPageSize" action={this.setPageSize} />
      </PluginContainer>
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
  totalCount: PropTypes.number,
};

PagingState.defaultProps = {
  pageSize: undefined,
  defaultPageSize: 10,
  onPageSizeChange: undefined,
  currentPage: undefined,
  defaultCurrentPage: 0,
  onCurrentPageChange: undefined,
  totalCount: 0,
};
