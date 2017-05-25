import React from 'react';
import PropTypes from 'prop-types';
import {
  Pagination,
} from './pagination';


export const Pager = ({ currentPage, onCurrentPageChange, totalPages }) => (
  <Pagination
    style={{
      margin: 0,
      verticalAlign: 'bottom',
    }}
    totalPages={totalPages}
    currentPage={currentPage + 1}
    onCurrentPageChange={page => onCurrentPageChange(page - 1)}
  />
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
};
