import React from 'react';
import PropTypes from 'prop-types';
import { PageSizeSelector } from './page-size-selector';
import { Pagination } from './pagination';

export const Pager = ({
  currentPage,
  allowedPageSizes,
  totalPages,
  pageSize,
  onCurrentPageChange,
  onPageSizeChange,
  }) => (
    <div style={{ overflow: 'hidden' }}>
      {!!allowedPageSizes.length && <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        allowedPageSizes={allowedPageSizes}
      />}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage + 1}
        onCurrentPageChange={page => onCurrentPageChange(page - 1)}
      />
    </div>
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};
