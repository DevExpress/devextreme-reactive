import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class PagingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.currentPage || props.defaultCurrentPage,
      pageSize: props.pageSize !== undefined ? props.pageSize : props.defaultPageSize,
    };

    const stateHelper = createStateHelper(
      this,
      {
        currentPage: () => this.props.onCurrentPageChange,
        pageSize: () => this.props.onPageSizeChange,
      },
    );

    this.setCurrentPage = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentPage', setCurrentPage);
    this.setPageSize = stateHelper.applyFieldReducer
      .bind(stateHelper, 'pageSize', setPageSize);
  }
  componentWillReceiveProps(nextProps) {
    const {
      currentPage,
      pageSize,
    } = nextProps;
    this.setState({
      ...currentPage !== undefined ? { currentPage } : null,
      ...pageSize !== undefined ? { pageSize } : null,
    });
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
