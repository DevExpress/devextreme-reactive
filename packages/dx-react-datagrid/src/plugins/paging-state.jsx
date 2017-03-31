import React from 'react';
import { Getter, Action } from '@devexpress/dx-react-core';
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
    const { pageSize } = this.props;
    const currentPage = this.props.currentPage || this.state.currentPage;

    return (
      <div>
        <Action name="setCurrentPage" action={({ page }) => this._setCurrentPage({ page })} />

        <Getter name="currentPage" value={currentPage} />
        <Getter name="pageSize" value={pageSize} />
      </div>
    );
  }
}

PagingState.propTypes = {
  pageSize: React.PropTypes.number,
  currentPage: React.PropTypes.number,
  defaultCurrentPage: React.PropTypes.number,
  currentPageChange: React.PropTypes.func,
};

PagingState.defaultProps = {
  pageSize: undefined,
  currentPage: undefined,
  defaultCurrentPage: undefined,
  currentPageChange: undefined,
};
