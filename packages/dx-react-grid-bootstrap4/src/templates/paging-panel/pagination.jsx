import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Pagination as PaginationBS4, PaginationItem, PaginationLink } from 'reactstrap';
import { firstRowOnPage, lastRowOnPage, calculateStartPage } from '@devexpress/dx-grid-core';

const renderPageButtons = (
  currentPage,
  totalPageCount,
  currentPageChange,
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
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={e => currentPageChange(e, 0)}
        >
          {1}
        </PaginationLink>
      </PaginationItem>
    ));

    if (startPage > 2) {
      pageButtons.push((
        <PaginationItem key="ellipsisStart" disabled>
          <PaginationLink>
            {'...'}
          </PaginationLink>
        </PaginationItem>
      ));
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pageButtons.push((
      <PaginationItem
        key={page}
        active={page === currentPage + 1}
        disabled={startPage === endPage}
      >
        <PaginationLink
          href="#"
          onClick={e => currentPageChange(e, page - 1)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push((
        <PaginationItem key="ellipsisEnd" disabled>
          <PaginationLink>
            {'...'}
          </PaginationLink>
        </PaginationItem>
      ));
    }

    pageButtons.push((
      <PaginationItem key={totalPageCount}>
        <PaginationLink
          href="#"
          onClick={e => currentPageChange(e, totalPageCount - 1)}
        >
          {totalPageCount}
        </PaginationLink>
      </PaginationItem>
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
  const currentPageChange = (e, nextPage) => {
    e.preventDefault();
    onCurrentPageChange(nextPage);
  };
  return (
    <React.Fragment>
      <PaginationBS4 className="float-right d-none d-sm-flex m-0">
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink
            previous
            href="#"
            onClick={e => currentPageChange(e, currentPage - 1)}
          />
        </PaginationItem>
        {renderPageButtons(currentPage, totalPages, currentPageChange)}
        <PaginationItem disabled={currentPage === totalPages - 1 || totalCount === 0}>
          <PaginationLink
            next
            href="#"
            onClick={e => currentPageChange(e, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationBS4>

      <PaginationBS4 className="float-right d-sm-none m-0">
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink
            previous
            href="#"
            onClick={e => currentPageChange(e, currentPage - 1)}
          />
        </PaginationItem>
        &nbsp;
        <PaginationItem disabled={currentPage === totalPages - 1 || totalCount === 0}>
          <PaginationLink
            next
            href="#"
            onClick={e => currentPageChange(e, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationBS4>
      <span className="float-right d-sm-none mr-4">
        <span className="d-inline-block align-middle">
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
