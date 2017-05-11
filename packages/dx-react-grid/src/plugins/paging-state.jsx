import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { setCurrentPage } from '@devexpress/dx-grid-core';

export class PagingState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.defaultCurrentPage || 0,
    };

    this._setCurrentPage = ({ page }) => {
      const { onCurrentPageChange } = this.props;
      const currentPage = setCurrentPage(this.state.currentPage, { page });
      this.setState({ currentPage });
      if (onCurrentPageChange) {
        onCurrentPageChange(currentPage);
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
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  defaultCurrentPage: PropTypes.number,
  onCurrentPageChange: PropTypes.func,
};

PagingState.defaultProps = {
  pageSize: undefined,
  totalCount: undefined,
  currentPage: undefined,
  defaultCurrentPage: undefined,
  onCurrentPageChange: undefined,
};
