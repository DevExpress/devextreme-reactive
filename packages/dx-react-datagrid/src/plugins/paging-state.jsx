import React from 'react';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setCurrentPage } from '@devexpress/dx-datagrid-core';

export class PagingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.defaultCurrentPage || 0,
    };

    this._setCurrentPage = ({ page }) => {
      const { currentPageChange } = this.props;
      const currentPage = setCurrentPage(this.state.currentPage, { page });
      this.setState({ currentPage });
      if (currentPageChange) {
        currentPageChange(currentPage);
      }
    };
  }
  render() {
    const { pageSize, totalCount, currentPage: propsCurrentPage } = this.props;
    const currentPage = propsCurrentPage === undefined ? this.state.currentPage : propsCurrentPage;

    return (
      <PluginContainer>
        <Action name="setCurrentPage" action={({ page }) => this._setCurrentPage({ page })} />

        <Getter name="currentPage" value={currentPage} />
        <Getter name="pageSize" value={pageSize} />
        <Getter name="totalPages" value={Math.max(1, Math.ceil(totalCount / pageSize))} />
      </PluginContainer>
    );
  }
}

PagingState.propTypes = {
  pageSize: React.PropTypes.number,
  totalCount: React.PropTypes.number,
  currentPage: React.PropTypes.number,
  defaultCurrentPage: React.PropTypes.number,
  currentPageChange: React.PropTypes.func,
};

PagingState.defaultProps = {
  pageSize: undefined,
  totalCount: undefined,
  currentPage: undefined,
  defaultCurrentPage: undefined,
  currentPageChange: undefined,
};
