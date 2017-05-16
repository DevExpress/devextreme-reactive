import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const PageSizeSelector = ({ pageSize, onPageSizeChange, pageSizes }) => (
  <ul
    className="pagination"
    style={{
      margin: 0,
      verticalAlign: 'bottom',
    }}
  >
    {pageSizes.map(item => (
      <li key={item} className={item === pageSize ? 'active' : ''}>
        {/* eslint-disable jsx-a11y/href-no-hash */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageSizeChange(item);
          }}
        >
          {item}
        </a>
        {/* eslint-enable jsx-a11y/href-no-hash */}
      </li>
    ))}
  </ul>
);

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export const Pager = ({
  currentPage,
  onCurrentPageChange,
  totalPages,
  pageSize,
  onPageSizeChange,
  pageSizes,
}) => (
  <div className="clearfix">
    {!!pageSizes.length && <PageSizeSelector
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      pageSizes={pageSizes}
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
      maxButtons={5}
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
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};
