import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as PaginationBS3, Pager as PagerBS3 } from 'react-bootstrap';
import { firstRowOnPage, lastRowOnPage } from '@devexpress/dx-grid-core';

const PageButton = ({
  text, isActive, isDisabled, onClick,
}) => (
  <PaginationBS3.Item
    active={isActive}
    disabled={isDisabled}
    onClick={onClick}
  >
    {text}
  </PaginationBS3.Item>
);

PageButton.propTypes = {
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

PageButton.defaultProps = {
  onClick: () => {},
  isDisabled: false,
  isActive: false,
};

const calculateStartPage = (currentPage, maxButtonCount, totalPageCount) => Math.max(
  Math.min(
    currentPage - Math.floor(maxButtonCount / 2, 10),
    (totalPageCount - maxButtonCount) + 1,
  ),
  1,
);

const renderPageButtons = (
  currentPage,
  totalPageCount,
  onCurrentPageChange,
) => {
  const pageButtons = [];
  const maxButtonCount = 3;
  let startPage = 1;
  let endPage = totalPageCount || 1;

  if (maxButtonCount < totalPageCount) {
    startPage = calculateStartPage(currentPage + 1, maxButtonCount, totalPageCount);
    endPage = (startPage + maxButtonCount) - 1;
  }
  if (startPage > 1) {
    pageButtons.push((
      <PageButton
        key={1}
        text={String(1)}
        onClick={() => onCurrentPageChange(0)}
      />
    ));

    if (startPage > 2) {
      pageButtons.push((
        <PaginationBS3.Ellipsis key="ellipsisStart" />
      ));
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pageButtons.push((
      <PageButton
        key={page}
        text={String(page)}
        isActive={page === currentPage + 1}
        onClick={() => onCurrentPageChange(page - 1)}
        isDisabled={startPage === endPage}
      />
    ));
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push((
        <PaginationBS3.Ellipsis key="ellipsisEnd" />
      ));
    }

    pageButtons.push((
      <PageButton
        key={totalPageCount}
        text={String(totalPageCount)}
        onClick={() => onCurrentPageChange(totalPageCount - 1)}
      />
    ));
  }

  return pageButtons;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onCurrentPageChange,
  totalCount,
  pageSize,
  getMessage,
}) => {
  const from = firstRowOnPage(currentPage, pageSize, totalCount);
  const to = lastRowOnPage(currentPage, pageSize, totalCount);
  return (
    <React.Fragment>
      <PaginationBS3
        style={{
          margin: 0,
          verticalAlign: 'bottom',
        }}
        className="pull-right hidden-xs"
      >
        {renderPageButtons(currentPage, totalPages, onCurrentPageChange)}
      </PaginationBS3>
      <PagerBS3
        className="pull-right visible-xs"
        style={{ margin: 0 }}
      >
        <PagerBS3.Item
          disabled={currentPage === 0}
          onClick={() => onCurrentPageChange(currentPage - 1)}
        >
          &laquo;
        </PagerBS3.Item>
        {' '}
        <PagerBS3.Item
          disabled={currentPage === totalPages - 1 || totalCount === 0}
          onClick={() => onCurrentPageChange(currentPage + 1)}
        >
          &raquo;
        </PagerBS3.Item>
      </PagerBS3>
      <span className="pull-right visible-xs" style={{ marginRight: '20px' }}>
        <span style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: '32px' }}>
          {getMessage('info', { from, to, count: totalCount })}
        </span>
      </span>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  getMessage: PropTypes.func.isRequired,
};
