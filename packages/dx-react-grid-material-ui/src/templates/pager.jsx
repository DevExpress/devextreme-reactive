import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from 'material-ui';

const PageButton = ({ text, isActive, onClick }) => (
  <Button
    style={{ minWidth: '16px' }}
    accent={isActive}
    raised={isActive}
    onTouchTap={onClick}
  >
    {text}
  </Button>
);

PageButton.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Pagination = ({ totalPages, currentPage, onCurrentPageChange }) => {
  const pages = [];

  for (let i = 0; i < totalPages; i += 1) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map(page => (
        <PageButton
          key={page}
          text={String(page + 1)}
          isActive={page === currentPage}
          onClick={() => onCurrentPageChange(page)}
        />
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
};

export const Pager = ({ currentPage, onCurrentPageChange, totalPages }) => (
  <Pagination
    style={{
      margin: 0,
      verticalAlign: 'bottom',
    }}
    totalPages={totalPages}
    currentPage={currentPage}
    onCurrentPageChange={page => onCurrentPageChange(page)}
  />
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
};
