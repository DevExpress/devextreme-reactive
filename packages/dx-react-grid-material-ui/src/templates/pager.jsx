import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { Pagination } from './pagination';

const PageSizeSelector = ({ pageSize, onPageSizeChange, allowedPageSizes }) => (
  <div style={{ display: 'inline-block' }}>
    {allowedPageSizes.map(item => (
      <Button
        key={item}
        style={{ minWidth: '16px' }}
        accent={item === pageSize}
        raised={item === pageSize}
        onTouchTap={(e) => {
          e.preventDefault();
          onPageSizeChange(item);
        }}
      >
        {item}
      </Button>
    ))}
  </div>
);

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

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
