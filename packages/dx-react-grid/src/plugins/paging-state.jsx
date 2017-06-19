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

    this._setCurrentPage = ({ page }) => {
      const { onCurrentPageChange } = this.props;
      const currentPage = setCurrentPage(this.state.currentPage, { page });
      this.setState({ currentPage });
      if (onCurrentPageChange) {
        onCurrentPageChange(currentPage);
      }
    };

    this._setPageSize = ({ size }) => {
      const { onPageSizeChange } = this.props;
      const pageSize = setPageSize(this.state.pageSize, { size });
      this.setState({ pageSize });
      if (onPageSizeChange) {
        onPageSizeChange(pageSize);
      }
    };
  }
  render() {
    const {
      pageSize = this.state.pageSize,
      totalCount,
      currentPage = this.state.currentPage,
    } = this.props;

    return (
      <PluginContainer>
        <Action name="setCurrentPage" action={({ page }) => this._setCurrentPage({ page })} />
        <Action name="setPageSize" action={({ size }) => this._setPageSize({ size })} />

        <Getter name="currentPage" value={currentPage} />
        <Getter name="pageSize" value={pageSize} />
        <Getter
          name="totalPages"
          value={pageSize ? Math.max(1, Math.ceil(totalCount / pageSize)) : 1}
        />
        <Getter name="totalCount" value={totalCount || 0} />
      </PluginContainer>
    );
  }
}

PagingState.propTypes = {
  pageSize: PropTypes.number,
  defaultPageSize: PropTypes.number,
  onPageSizeChange: PropTypes.func,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  defaultCurrentPage: PropTypes.number,
  onCurrentPageChange: PropTypes.func,
};

PagingState.defaultProps = {
  pageSize: undefined,
  defaultPageSize: 10,
  onPageSizeChange: undefined,
  totalCount: undefined,
  currentPage: undefined,
  defaultCurrentPage: 0,
  onCurrentPageChange: undefined,
};
