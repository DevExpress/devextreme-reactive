import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

export const Pager = ({ currentPage, onCurrentPageChange, totalPages }) => (
  <Pagination
    style={{
      margin: 0,
      verticalAlign: 'bottom',
    }}
    items={totalPages}
    activePage={currentPage + 1}
    boundaryLinks
    maxButtons={5}
    onSelect={page => onCurrentPageChange(page - 1)}
  />
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
};
