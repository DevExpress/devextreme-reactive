import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pagination as PaginationBS3, Pager as PagerBS3 } from 'react-bootstrap';
import { firstRowOnPage, lastRowOnPage, calculateStartPage } from '@devexpress/dx-grid-core';

const renderPageButtons = (
  currentPage,
  totalPageCount,
  onCurrentPageChange,
) => {
  const pageButtons = [];
  const maxButtonCount = 3;
  let startPage = 1;
  let endPage = totalPageCount || 1;

  // NOTE: take into account last button and ellipsis (T1004797)
  if (maxButtonCount < totalPageCount - 2) {
    startPage = calculateStartPage(currentPage + 1, maxButtonCount, totalPageCount);
    endPage = (startPage + maxButtonCount) - 1;
  }
  if (startPage > 1) {
    pageButtons.push((
      <PaginationBS3.Item
        key={1}
        onClick={() => onCurrentPageChange(0)}
      >
        {1}
      </PaginationBS3.Item>
    ));

    if (startPage > 2) {
      pageButtons.push((
        <PaginationBS3.Ellipsis key="ellipsisStart" disabled />
      ));
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pageButtons.push((
      <PaginationBS3.Item
        key={page}
        onClick={() => onCurrentPageChange(page - 1)}
        active={page === currentPage + 1}
        disabled={startPage === endPage}
      >
        {page}
      </PaginationBS3.Item>
    ));
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push((
        <PaginationBS3.Ellipsis key="ellipsisEnd" disabled />
      ));
    }

    pageButtons.push((
      <PaginationBS3.Item
        key={totalPageCount}
        onClick={() => onCurrentPageChange(totalPageCount - 1)}
      >
        {totalPageCount}
      </PaginationBS3.Item>
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
        <PaginationBS3.Item
          disabled={currentPage === 0}
          onClick={() => onCurrentPageChange(currentPage - 1)}
          aria-label="Previous"
        >
          &laquo;
        </PaginationBS3.Item>
        {renderPageButtons(currentPage, totalPages, onCurrentPageChange)}
        <PaginationBS3.Item
          disabled={currentPage === totalPages - 1 || totalCount === 0}
          onClick={() => onCurrentPageChange(currentPage + 1)}
          aria-label="Next"
        >
          &raquo;
        </PaginationBS3.Item>
      </PaginationBS3>

      <PagerBS3
        className="pull-right visible-xs"
        style={{ margin: 0 }}
      >
        <PagerBS3.Item
          disabled={currentPage === 0}
          onClick={() => onCurrentPageChange(currentPage - 1)}
          aria-label="Previous"
        >
          &laquo;
        </PagerBS3.Item>
        &nbsp;
        <PagerBS3.Item
          disabled={currentPage === totalPages - 1 || totalCount === 0}
          onClick={() => onCurrentPageChange(currentPage + 1)}
          aria-label="Next"
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
