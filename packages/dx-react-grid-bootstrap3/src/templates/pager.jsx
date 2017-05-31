import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';
import { PageSizeSelector } from './page-size-selector';

export const Pager = ({
  currentPage,
  onCurrentPageChange,
  totalPages,
  pageSize,
  onPageSizeChange,
  allowedPageSizes,
}) => (
  <div className="clearfix">
    {!!allowedPageSizes.length && <PageSizeSelector
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      allowedPageSizes={allowedPageSizes}
    />}
    <Pagination
      style={{
        margin: 0,
        verticalAlign: 'bottom',
      }}
      className="pull-right"
      items={totalPages}
      activePage={currentPage + 1}
      boundaryLinks
      maxButtons={3}
      onSelect={page => onCurrentPageChange(page - 1)}
    />
  </div>
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};
