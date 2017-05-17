import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const PageSizeSelector = ({ pageSize, onPageSizeChange, allowedPageSizes }) => (
  <div style={{ display: 'inline-block' }}>
    <select
      className="form-control visible-xs-inline-block"
      style={{ width: 'auto' }}
      value={pageSize}
      onChange={e => onPageSizeChange(parseInt(e.target.value, 10))}
    >
      {allowedPageSizes.map(val => <option key={val} value={val}>{val}</option>)}
    </select>
    <ul
      className="pagination hidden-xs"
      style={{
        margin: 0,
        verticalAlign: 'bottom',
      }}
    >
      {allowedPageSizes.map(item => (
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
  </div>
);

PageSizeSelector.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

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
